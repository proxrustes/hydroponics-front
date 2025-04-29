import { cleanupDatabase } from "./seedScripts/cleanup";
import { seedPlants } from "./seedScripts/plants";
import { seedUsersAndStations } from "./seedScripts/users-stations";

async function main() {
  console.log("🌱 Сидирование запущено");
  await cleanupDatabase();
  await seedPlants();
  await seedUsersAndStations();
  console.log("✅ Сидирование завершено");
}

main().catch((e) => {
  console.error("❌ Ошибка сидирования:", e);
  process.exit(1);
});
