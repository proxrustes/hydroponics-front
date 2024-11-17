export type Station = {
    id: number,
    name: string;
  plant: string;
  params: StationParams;
}

export type StationParams = {
    ph_level: number;
    temperature: number;
    humidity: number;
    light_intensity: number;
    nutrient_concentration: number;
  };

  export type NormalParams = {
    ph_level: [number, number];
    temperature: [number, number];
    humidity: [number, number];
    light_intensity: [number, number];
    nutrient_concentration: [number, number];
};

export const normalParams: Record<string, NormalParams> = {
  Tomatoes: {
      ph_level: [5.5, 6.5],
      temperature: [18, 26],
      humidity: [50, 70],
      light_intensity: [600, 800],
      nutrient_concentration: [1.0, 1.6]
  },
  Lettuce: {
      ph_level: [5.5, 6.5],
      temperature: [16, 22],
      humidity: [50, 65],
      light_intensity: [600, 700],
      nutrient_concentration: [0.8, 1.5]
  },
  Basil: {
      ph_level: [5.5, 6.5],
      temperature: [20, 25],
      humidity: [45, 60],
      light_intensity: [700, 800],
      nutrient_concentration: [1.2, 1.8]
  },
  Strawberries: {
      ph_level: [5.5, 6.0],
      temperature: [18, 24],
      humidity: [60, 75],
      light_intensity: [500, 650],
      nutrient_concentration: [1.0, 1.5]
  },
  Cucumbers: {
      ph_level: [5.5, 6.5],
      temperature: [20, 28],
      humidity: [55, 75],
      light_intensity: [600, 750],
      nutrient_concentration: [1.2, 1.7]
  }
};
