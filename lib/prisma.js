import { PrismaClient } from "./generated/prisma";

export const db =
  globalThis.prisma ||
  new PrismaClient({
    adapter: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

