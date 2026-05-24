import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Mumbai Warehouse",
    },
  });

  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 16",
    },
  });

  const samsung = await prisma.product.create({
    data: {
      name: "Samsung S25",
    },
  });

  await prisma.inventory.create({
    data: {
      productId: iphone.id,
      warehouseId: warehouse.id,
      totalStock: 50,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: samsung.id,
      warehouseId: warehouse.id,
      totalStock: 30,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
