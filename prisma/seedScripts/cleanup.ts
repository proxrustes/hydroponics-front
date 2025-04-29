import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function cleanupDatabase() {
  await prisma.zoneParamsLog.deleteMany({});
  await prisma.stationParamsLog.deleteMany({});
  await prisma.zoneNorms.deleteMany({});
  await prisma.zone.deleteMany({});
  await prisma.station.deleteMany({});
  await prisma.norms.deleteMany({});
  await prisma.plant.deleteMany({});
  await prisma.plantGroup.deleteMany({});
  await prisma.user.deleteMany({});
}
