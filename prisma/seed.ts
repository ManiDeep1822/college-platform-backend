import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        fees: 250000,
        rating: 4.9,
        description: "Top engineering institute in India",
      },
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 240000,
        rating: 4.8,
        description: "Premier technology institute",
      },
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 180000,
        rating: 4.7,
        description: "Top NIT in India",
      },
      {
        name: "BITS Pilani",
        location: "Rajasthan",
        fees: 450000,
        rating: 4.8,
        description: "Private engineering institute",
      },
    ],
  });

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
