import { PlantGroup } from "./Plant";
import { Station, Zone } from "./StationParams";

export const initialPlantGroups: PlantGroup[] = [
  {
    title: "Листова зелень",
    plants: [
      {
        id: 0,
        name: "Салат",
        description: "Листова зелень, підходить для вирощування в гідропоніці.",
        norm: {
          ph_level: [5.5, 6.5],
          temperature: [16, 20],
          air_humidity: [60, 80],
          light_intensity: [400, 600],
          nutrient_concentration: [1.0, 1.5],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
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
          ph_level: [5.5, 6.5],
          temperature: [20, 26],
          air_humidity: [65, 85],
          light_intensity: [500, 700],
          nutrient_concentration: [1.5, 2.5],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
        },
      },
      {
        id: 4,
        name: "Полуниця",
        description:
          "Плодоносна рослина, що віддає перевагу прохолодній температурі та помірному освітленню.",
        norm: {
          ph_level: [5.5, 6.5],
          temperature: [18, 24],
          air_humidity: [70, 80],
          light_intensity: [400, 600],
          nutrient_concentration: [1.2, 1.8],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
        },
      },
      {
        id: 5,
        name: "Огірок",
        description:
          "Плетиста рослина, що потребує теплої температури та високої вологості.",
        norm: {
          ph_level: [5.5, 6.5],
          temperature: [22, 28],
          air_humidity: [75, 95],
          light_intensity: [400, 700],
          nutrient_concentration: [1.4, 2.2],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
        },
      },
      {
        id: 6,
        name: "Перець",
        description:
          "Плодоносна рослина, що потребує інтенсивного освітлення і тепла.",
        norm: {
          ph_level: [5.8, 6.8],
          temperature: [20, 26],
          air_humidity: [60, 80],
          light_intensity: [500, 800],
          nutrient_concentration: [1.6, 2.4],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
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
          ph_level: [5.5, 6.5],
          temperature: [18, 24],
          air_humidity: [60, 80],
          light_intensity: [300, 500],
          nutrient_concentration: [1.0, 1.6],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
        },
      },
      {
        id: 8,
        name: "М’ята",
        description: "Витривала трава, що росте в широкому діапазоні умов.",
        norm: {
          ph_level: [5.5, 7.0],
          temperature: [18, 24],
          air_humidity: [60, 80],
          light_intensity: [250, 500],
          nutrient_concentration: [1.0, 1.5],
          substrate_humidity: [30, 100],
          solution_lvl: [30, 100],
          solution_temperature: [18, 24]
        },
      },
    ],
  },
];

const mockZones: Zone[] = [
  {
    id: 0,
    name: "Zone 1",
    plant: initialPlantGroups[1].plants[1],
    params: {
      temperature: 20,
      air_humidity: 75,
      substrate_humidity: 80,
    },
    isLightOn: true
  },
  {
    id: 1,
    name: "Zone 2",
    plant: initialPlantGroups[0].plants[0],
    params: {
      temperature: 24,
      substrate_humidity: 90,
      air_humidity: 80,
    },
    isLightOn: false
  },
  {
    id: 2,
    name: "Zone 3",
    plant: initialPlantGroups[1].plants[0],
    params: {
      temperature: 17,
      air_humidity: 80,
      substrate_humidity: 90
    },
    isLightOn: false
  },
 
];

export const mockStations: Station[] = [{
  id: 0,
  name: "то шо в підвалі",
  zones: mockZones,
  station_params: {
    ph_level: 8,
    nutrient_concentration: 80,
    solution_temperature: 22,
    solution_lvl: 99
  }
}]

