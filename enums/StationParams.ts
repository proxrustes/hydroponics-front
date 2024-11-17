import { Plant, PlantParams } from "./Plant";

export type Station = {
    id: number,
    name: string;
  plant: Plant;
  params:PlantParams
}

