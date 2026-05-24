import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: body.reservationId,
      },
    });

  if (!reservation) {
    return Response.json(
      { error: "Reservation not found" },
      { status: 404 }
    );
  }

  if (reservation.status !== "ACTIVE") {
    return Response.json(
      { error: "Reservation already closed" },
      { status: 400 }
    );
  }

  await prisma.inventory.update({
    where: {
      id: reservation.inventoryId,
    },
    data: {
      reservedStock: {
        decrement: 1,
      },
    },
  });

  await prisma.reservation.update({
    where: {
      id: reservation.id,
    },
    data: {
      status: "EXPIRED",
    },
  });

  return Response.json({
    success: true,
  });
}