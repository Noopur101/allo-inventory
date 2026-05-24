export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const inventory = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  const formatted = inventory.map((item) => ({
    inventoryId: item.id,
    product: item.product.name,
    warehouse: item.warehouse.name,
    available:
      item.totalStock - item.reservedStock,
    reserved: item.reservedStock,
    total: item.totalStock,
  }));

  return Response.json(formatted);
}