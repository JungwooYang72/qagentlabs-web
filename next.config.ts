import type { NextConfig } from "next";
import { MACHINECARE_FREE } from "./src/lib/machinecare-free";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: MACHINECARE_FREE.path,
        headers: [
          { key: "Content-Disposition", value: `attachment; filename="${MACHINECARE_FREE.filename}"` },
        ],
      },
    ];
  },
};

export default nextConfig;
