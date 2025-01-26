import { PlantGroup } from "@/enums/types/Plant";
import { Station } from "@/enums/types/Station";
import { Zone } from "@/enums/types/Zone";


export const initialPlantGroups: PlantGroup[] = [
  {
    title: "Листова зелень",
    plants: [
      {
        id: 0,
        name: "Салат",
        description: "Листова зелень, підходить для вирощування в гідропоніці.",
        norm: {
          phLevel: [5.5, 6.5],
          temperature: [16, 20],
          airHumidity: [60, 80],
          lightIntensity: [400, 600],
          nutrientConcentration: [1.0, 1.5],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      }
    ],
  },
  {
    title: "Плодоносні рослини",
    plants: [
      {
        id: 3,
        name: "Томат",
        description:
          "Рослина з плодами, потребує інтенсивного освітлення і тепла.",
        norm: {
          phLevel: [5.5, 6.5],
          temperature: [20, 26],
          airHumidity: [65, 85],
          lightIntensity: [500, 700],
          nutrientConcentration: [1.5, 2.5],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
      {
        id: 4,
        name: "Полуниця",
        description:
          "Плодоносна рослина, що віддає перевагу прохолодній температурі та помірному освітленню.",
        norm: {
          phLevel: [5.5, 6.5],
          temperature: [18, 24],
          airHumidity: [70, 80],
          lightIntensity: [400, 600],
          nutrientConcentration: [1.2, 1.8],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
      {
        id: 5,
        name: "Огірок",
        description:
          "Плетиста рослина, що потребує теплої температури та високої вологості.",
        norm: {
          phLevel: [5.5, 6.5],
          temperature: [22, 28],
          airHumidity: [75, 95],
          lightIntensity: [400, 700],
          nutrientConcentration: [1.4, 2.2],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
      {
        id: 6,
        name: "Перець",
        description:
          "Плодоносна рослина, що потребує інтенсивного освітлення і тепла.",
        norm: {
          phLevel: [5.8, 6.8],
          temperature: [20, 26],
          airHumidity: [60, 80],
          lightIntensity: [500, 800],
          nutrientConcentration: [1.6, 2.4],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
    ],
  },
  {
    title: "Ароматичні трави",
    plants: [
      {
        id: 7,
        name: "Базилік",
        description:
          "Ароматична трава, що добре росте в теплих умовах з помірною вологістю.",
        norm: {
          phLevel: [5.5, 6.5],
          temperature: [18, 24],
          airHumidity: [60, 80],
          lightIntensity: [300, 500],
          nutrientConcentration: [1.0, 1.6],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
      {
        id: 8,
        name: "М’ята",
        description: "Витривала трава, що росте в широкому діапазоні умов.",
        norm: {
          phLevel: [5.5, 7.0],
          temperature: [18, 24],
          airHumidity: [60, 80],
          lightIntensity: [250, 500],
          nutrientConcentration: [1.0, 1.5],
          substrateHumidity: [30, 100],
          solutionLvl: [30, 100],
          solutionTemperature: [18, 24]
        },
      },
    ],
  },
];

export const mockZones: Zone[] = [
  {
    id: 0,
    name: "Zone 1",
    plant: initialPlantGroups[1].plants[1],
    params: {
      temperature: 20,
      airHumidity: 75,
      substrateHumidity: 80,
    },
    isLightOn: true
  },
  {
    id: 1,
    name: "Zone 2",
    plant: initialPlantGroups[0].plants[0],
    params: {
      temperature: 24,
      substrateHumidity: 90,
      airHumidity: 80,
    },
    isLightOn: false
  },
  {
    id: 2,
    name: "Zone 3",
    plant: initialPlantGroups[1].plants[0],
    params: {
      temperature: 17,
      airHumidity: 80,
      substrateHumidity: 90
    },
    isLightOn: false
  },
 
];

export const mockStations: Station[] = [{
  id: 0,
  name: "тa шо в підвалі",
  zones: mockZones,
  stationParams: {
    phLevel: 8,
    nutrientConcentration: 80,
    solutionTemperature: 22,
    solutionLvl: 99
  }
}]

