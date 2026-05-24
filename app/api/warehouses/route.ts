export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const warehouses =
    await prisma.warehouse.findMany();

  return Response.json(warehouses);
}