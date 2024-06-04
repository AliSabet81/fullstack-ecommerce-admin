import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb; // as we don't want new instance(new PrismaClient) to be created in developemnt mode on every nextjs-13 hard load.

export default prismadb;
