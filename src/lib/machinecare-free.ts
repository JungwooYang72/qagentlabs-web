const version = "0.1.0-free.2";
const filename = `QAgent-MachineCare-Free-${version}-win-x64.zip`;

export const MACHINECARE_FREE = {
  version,
  filename,
  path: `/downloads/machinecare/${filename}`,
  size: "65.2 MB",
  platform: "Windows 11 x64",
} as const;
