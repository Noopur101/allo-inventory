import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id,
      },
    });

  if (!reservation) {
    return Response.json(
      { error: "Reservation not found" },
      { status: 404 }
    );
  }

  if (reservation.expiresAt < new Date()) {
    return Response.json(
      { error: "Reservation expired" },
      { status: 410 }
    );
  }

  const updated =
    await prisma.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        status: "CONFIRMED",
      },
    });

  return Response.json(updated);
}