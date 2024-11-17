export type Plant = {
    id: number,
  name: string;
  description: string;
  norm: NormalParams
};

export type PlantParams = {
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

export type PlantGroup = {
    title: string,
    plants: Plant[]
}