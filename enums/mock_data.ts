import { Plant, PlantGroup } from "./Plant";
import { Station } from "./StationParams";

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
          humidity: [60, 80],
          light_intensity: [400, 600],
          nutrient_concentration: [1.0, 1.5],
        },
      },
      {
        id: 1,
        name: "Шпинат",
        description:
          "Листова зелень, добре росте при прохолодній температурі та високій вологості.",
        norm: {
          ph_level: [6.0, 7.5],
          temperature: [10, 18],
          humidity: [70, 90],
          light_intensity: [250, 450],
          nutrient_concentration: [1.4, 1.8],
        },
      },
      {
        id: 2,
        name: "Капуста кале",
        description:
          "Насичена поживними речовинами листова зелень, що процвітає при прохолодній температурі.",
        norm: {
          ph_level: [5.5, 6.8],
          temperature: [15, 20],
          humidity: [65, 85],
          light_intensity: [300, 500],
          nutrient_concentration: [1.2, 1.8],
        },
      },
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
          humidity: [65, 85],
          light_intensity: [500, 700],
          nutrient_concentration: [1.5, 2.5],
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
          humidity: [70, 80],
          light_intensity: [400, 600],
          nutrient_concentration: [1.2, 1.8],
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
          humidity: [75, 95],
          light_intensity: [400, 700],
          nutrient_concentration: [1.4, 2.2],
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
          humidity: [60, 80],
          light_intensity: [500, 800],
          nutrient_concentration: [1.6, 2.4],
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
          humidity: [60, 80],
          light_intensity: [300, 500],
          nutrient_concentration: [1.0, 1.6],
        },
      },
      {
        id: 8,
        name: "М’ята",
        description: "Витривала трава, що росте в широкому діапазоні умов.",
        norm: {
          ph_level: [5.5, 7.0],
          temperature: [18, 24],
          humidity: [60, 80],
          light_intensity: [250, 500],
          nutrient_concentration: [1.0, 1.5],
        },
      },
    ],
  },
];

export const mockStations: Station[] = [
  {
    id: 0,
    name: "Station 1",
    plant: initialPlantGroups[1].plants[1],
    params: {
      ph_level: 7,
      temperature: 20,
      humidity: 0,
      light_intensity: 0.4,
      nutrient_concentration: 0,
    },
  },
  {
    id: 1,
    name: "Station 2",
    plant: initialPlantGroups[1].plants[0],
    params: {
      ph_level: 0,
      temperature: 0,
      humidity: 0,
      light_intensity: 0,
      nutrient_concentration: 0,
    },
  },
  {
    id: 2,
    name: "Station 3",
    plant: initialPlantGroups[0].plants[2],
    params: {
      ph_level: 0,
      temperature: 0,
      humidity: 0,
      light_intensity: 0,
      nutrient_concentration: 0,
    },
  },
  {
    id: 3,
    name: "Station 4",
    plant: initialPlantGroups[0].plants[1],
    params: {
      ph_level: 0,
      temperature: 0,
      humidity: 0,
      light_intensity: 0,
      nutrient_concentration: 0,
    },
  },
  {
    id: 4,
    name: "Station 5",
    plant: initialPlantGroups[0].plants[0],
    params: {
      ph_level: 0,
      temperature: 0,
      humidity: 0,
      light_intensity: 0,
      nutrient_concentration: 0,
    },
  },
];
