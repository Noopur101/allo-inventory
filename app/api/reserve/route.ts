import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const inventory =
          await tx.inventory.findUnique({
            where: {
              id: body.inventoryId,
            },
          });

        if (!inventory) {
          throw new Error("NOT_FOUND");
        }

        const available =
          inventory.totalStock -
          inventory.reservedStock;

        if (available <= 0) {
          throw new Error("OUT_OF_STOCK");
        }

        const updatedInventory =
          await tx.inventory.update({
            where: {
              id: inventory.id,
            },
            data: {
              reservedStock: {
                increment: 1,
              },
            },
          });

        const reservation =
          await tx.reservation.create({
            data: {
              inventoryId: inventory.id,
              expiresAt: new Date(
                Date.now() + 10 * 60 * 1000
              ),
              status: "ACTIVE",
            },
          });

        return {
          reservation,
          inventory: updatedInventory,
        };
      },
      {
        isolationLevel: "Serializable",
      }
    );

    return Response.json(result);
  } catch (error: any) {
    if (error.message === "OUT_OF_STOCK") {
      return Response.json(
        { error: "Not enough stock" },
        { status: 409 }
      );
    }

    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { error: "Reservation failed" },
      { status: 500 }
    );
  }
}