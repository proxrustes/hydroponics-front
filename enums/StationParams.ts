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