let reservations: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  const reservation = {
    id: Date.now().toString(),
    inventoryId: body.inventoryId,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000,
    status: "ACTIVE",
  };

  reservations.push(reservation);

  return Response.json(reservation);
}

export async function GET() {
  return Response.json(reservations);
}
