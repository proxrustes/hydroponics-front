import { initialPlantGroups } from '../lib/mock_data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    console.log('🌱 Начало сидирования...');
  
    for (const group of initialPlantGroups) {
      // Создание группы растений
      const plantGroup = await prisma.plantGroup.create({
        data: {
          name: group.title,
          plants: {
            create: group.plants.map(plant => ({
              name: plant.name,
              description: plant.description,
              norms: {
                create: {
                  temperature: (plant.norm.temperature[0] + plant.norm.temperature[1]) / 2,
                  airHumidity: (plant.norm.air_humidity[0] + plant.norm.air_humidity[1]) / 2,
                  substrateHumidity: (plant.norm.substrate_humidity[0] + plant.norm.substrate_humidity[1]) / 2,
                  phLevel: (plant.norm.ph_level[0] + plant.norm.ph_level[1]) / 2,
                  nutrientConcentration: (plant.norm.nutrient_concentration[0] + plant.norm.nutrient_concentration[1]) / 2,
                  solutionTemperature: (plant.norm.solution_temperature[0] + plant.norm.solution_temperature[1]) / 2,
                  solutionLvl: (plant.norm.solution_lvl[0] + plant.norm.solution_lvl[1]) / 2,
                  lightIntensity: (plant.norm.light_intensity[0] + plant.norm.light_intensity[1]) / 2,
                }
              }
            }))
          }
        }
      });
  
      console.log(`✅ Добавлена группа: ${plantGroup.name}`);
    }
  
    // Создание зон
    const tomatoPlant = await prisma.plant.findFirst({ where: { name: 'Томат' } });
  
    const tomatoZoneParams = await prisma.zoneParams.create({
      data: {
        temperature: 24,
        airHumidity: 85,
        substrateHumidity: 75,
      },
    });
  
    const tomatoStationParams = await prisma.stationParams.create({
      data: {
        phLevel: 6.2,
        nutrientConcentration: 2.0,
        solutionTemperature: 22,
        solutionLvl: 85,
      },
    });
  
    await prisma.zone.create({
      data: {
        name: 'Гідропонна зона для Томатів',
        plantId: tomatoPlant!.id,
        isLightOn: true,
        zoneParamsId: tomatoZoneParams.id,
        stationParamsId: tomatoStationParams.id,
      }
    });
  
    console.log('✅ Добавлена зона выращивания для Томатів');
  
    console.log('🌱 Сидирование завершено!');
  }
  
  seed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.error('❌ Ошибка при сидировании:', error);
      await prisma.$disconnect();
      process.exit(1);
    });