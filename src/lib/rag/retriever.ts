import Fuse from 'fuse.js';
import knowledgeDataRaw from './knowledge.json';

export interface KnowledgeRecord {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  priority: number;
  audience: string[];
  relatedServices: string[];
}

const knowledgeData = knowledgeDataRaw as KnowledgeRecord[];

// 1. Fuse.js Instance (Cached globally)
const fuseOptions = {
  includeScore: true,
  threshold: 0.5,
  keys: [
    { name: 'keywords', weight: 0.5 },
    { name: 'title', weight: 0.3 },
    { name: 'content', weight: 0.2 }
  ]
};
const fuse = new Fuse<KnowledgeRecord>(knowledgeData, fuseOptions);

// 2. Intent Classification
export enum Intent {
  SERVICE = 'SERVICE',
  PRICE = 'PRICE',
  BUILD = 'BUILD',
  COUPANG = 'COUPANG',
  MANUFACTURER = 'MANUFACTURER',
  DANGER = 'DANGER',
  UNRELATED = 'UNRELATED',
  GENERAL = 'GENERAL'
}

const BLOCKED_WORDS = ['씨발', '개새끼', '존나', '병신', '섹스', '야동', '도박', '카지노'];
const UNRELATED_WORDS = ['정치', '종교', '게임', '연애', '코딩 질문'];

export function classifyIntent(query: string): Intent {
  if (BLOCKED_WORDS.some(w => query.includes(w))) return Intent.DANGER;
  if (UNRELATED_WORDS.some(w => query.includes(w))) return Intent.UNRELATED;
  
  if (query.includes('쿠팡') || query.includes('스마트스토어')) return Intent.COUPANG;
  if (query.includes('제조') || query.includes('공장') || query.includes('B2B')) return Intent.MANUFACTURER;
  if (query.includes('가격') || query.includes('비용') || query.includes('얼마')) return Intent.PRICE;
  if (query.includes('구축') || query.includes('연동') || query.includes('ERP')) return Intent.BUILD;
  if (query.includes('서비스') || query.includes('자동화')) return Intent.SERVICE;
  
  return Intent.GENERAL;
}

// 3. Recommendation Engine
export function getRecommendation(query: string): string | null {
  if (query.includes('혼자') || query.includes('1인') || query.includes('초보')) return 'Lite';
  if (query.includes('상품 수') || query.includes('성장') || query.includes('반복')) return 'Starter';
  if (query.includes('조직') || query.includes('팀원') || query.includes('중형')) return 'Business';
  if (query.includes('ERP') || query.includes('내부 시스템') || query.includes('제조') || query.includes('권한')) return 'Enterprise';
  return null;
}

// 4. Hybrid Retrieval & Dynamic Budget Context Injection
export function retrieveContext(query: string, intent: Intent) {
  const fuseResults = fuse.search(query);
  
  // Custom Scoring (Hybrid)
  const hybridResults = fuseResults.map(res => {
    let finalScore = res.score || 1;
    const item = res.item;

    // 카테고리 & 인텐트 부스팅 (숫자가 낮을수록 매칭률 높음)
    if (intent === Intent.COUPANG && item.keywords.includes('쿠팡')) finalScore *= 0.5;
    if (intent === Intent.MANUFACTURER && item.audience.includes('제조사')) finalScore *= 0.5;
    if (item.category === 'policies') finalScore *= 0.8; // 정책은 항상 약간의 우선권

    // Priority 기반 보정 (Priority가 10이면 스코어 추가 할인)
    finalScore = finalScore - (item.priority * 0.01);

    return { item, finalScore };
  });

  // Sort by final score
  hybridResults.sort((a, b) => a.finalScore - b.finalScore);

  // Deduplicate and Dynamic Budget
  const MAX_TOKEN_CHARS = 1500;
  let currentChars = 0;
  const selectedChunks: KnowledgeRecord[] = [];
  const seenIds = new Set<string>();

  for (const { item } of hybridResults) {
    if (seenIds.has(item.id)) continue;
    
    const chunkSize = item.content.length + item.title.length;
    if (currentChars + chunkSize > MAX_TOKEN_CHARS) {
      break; // Budget 초과 시 중단
    }

    selectedChunks.push(item);
    seenIds.add(item.id);
    currentChars += chunkSize;
  }

  // 필수 정책 강제 주입 (공간이 남는다면)
  const ctaChunk = knowledgeData.find(k => k.id === 'consultation_cta');
  if (ctaChunk && currentChars + ctaChunk.content.length < 2000 && !seenIds.has(ctaChunk.id)) {
    selectedChunks.push(ctaChunk);
  }

  // Format String
  const contextString = selectedChunks.map(item => `[${item.category.toUpperCase()}] ${item.title}\n${item.content}`).join('\n\n');
  const sources = selectedChunks.filter(i => i.category !== 'policies' && i.category !== 'consultation').map(i => i.title);

  return { contextString, sources };
}

// 5. Driver-specific Hybrid Retrieval (RAG)
export function retrieveDriverContext(query: string) {
  const fuseResults = fuse.search(query);
  
  // Filter only driver category
  const driverResults = fuseResults.filter(res => res.item.category === 'driver');

  // Deduplicate and Dynamic Budget
  const MAX_TOKEN_CHARS = 1500;
  let currentChars = 0;
  const selectedChunks: KnowledgeRecord[] = [];
  const seenIds = new Set<string>();

  for (const res of driverResults) {
    const item = res.item;
    if (seenIds.has(item.id)) continue;
    
    const chunkSize = item.content.length + item.title.length;
    if (currentChars + chunkSize > MAX_TOKEN_CHARS) {
      break;
    }

    selectedChunks.push(item);
    seenIds.add(item.id);
    currentChars += chunkSize;
  }

  // Check if we need to force append the driver consultation CTA
  const driverCtaChunk = knowledgeData.find(k => k.id === 'driver_consultation');
  if (driverCtaChunk && currentChars + driverCtaChunk.content.length < 2000 && !seenIds.has(driverCtaChunk.id)) {
    selectedChunks.push(driverCtaChunk);
  }

  // Format String
  const contextString = selectedChunks.map(item => `[FAQ] ${item.title}\n${item.content}`).join('\n\n');
  const sources = selectedChunks.map(i => i.title);

  return { contextString, sources };
}

