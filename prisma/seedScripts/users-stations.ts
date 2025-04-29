import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedUsersAndStations() {
  // Создаём пользователей
  const users = await prisma.user.createMany({
    data: [
      {
        email: "admin@hydro.local",
        name: "Nastya Ku",
        password: "admin",
        role: "ADMIN",
      },
      {
        email: "user1@hydro.local",
        name: "Romka Khu",
        password: "userpass1",
        role: "USER",
      },
      {
        email: "user2@hydro.local",
        name: "Mary Jane",
        password: "userpass2",
        role: "USER",
      },
    ],
  });
  console.log("✅ Пользователи добавлены");

  // Получаем ID пользователей
  const user1 = await prisma.user.findUnique({
    where: { email: "user1@hydro.local" },
  });
  const user2 = await prisma.user.findUnique({
    where: { email: "user2@hydro.local" },
  });

  if (!user1 || !user2)
    throw new Error("❌ Не удалось получить ID пользователей");

  // Создаём станции для каждого
  const stations = await prisma.station.createMany({
    data: [
      { name: "Станція 1 користувача 1", userId: user1.id },
      { name: "Станція 2 користувача 1", userId: user1.id },
      { name: "Станція 1 користувача 2", userId: user2.id },
    ],
  });
  console.log("✅ Станции добавлены для пользователей");
}
