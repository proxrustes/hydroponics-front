import { Plant, PlantParams } from "./Plant";

export type Zone = {
  id: number,
  name: string;
  plant: Plant;
  params: PlantParams
}

export type Station = {
  id: number,
  name: string,
  zones: Zone[],
  station_params: StationParams
}

export type StationParams = {
  ph_level: number;
  substrate_humidity: number;
  solution_temperature: number;
  solution_lvl: number
}