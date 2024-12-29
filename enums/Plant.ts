export type Plant = {
    id: number,
  name: string;
  description: string;
  norm: NormalParams
};

export type PlantParams = {
  temperature: number;
  air_humidity: number;
  substrate_humidity: number;
};

export type PlantParamNorms = {
  temperature: [number, number];
  air_humidity: [number, number];
  substrate_humidity: [number, number];
};

export type NormalParams = {
  ph_level: [number, number];
  temperature: [number, number];
  air_humidity: [number, number];
  light_intensity: [number, number];
  nutrient_concentration: [number, number];
  substrate_humidity: [number, number];
  solution_temperature: [number, number];
  solution_lvl: [number, number];
};

export type PlantGroup = {
    title: string,
    plants: Plant[]
}