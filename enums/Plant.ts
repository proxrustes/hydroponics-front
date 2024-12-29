import { StationParamNorms, ZoneParamNorms } from "./Params";

export type Plant = {
  id: number,
  name: string;
  description: string;
  norm: ZoneParamNorms & StationParamNorms
};

export type PlantGroup = {
  title: string,
  plants: Plant[]
}