import type { NextConfig } from "next";

// La scelta della lingua su "/" è fatta da src/proxy.ts (cookie, poi
// Accept-Language), non da un redirect statico.
const nextConfig: NextConfig = {};

export default nextConfig;
