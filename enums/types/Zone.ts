import { ZoneParams } from "./Params";
import { Plant } from "./Plant";

export type Zone = {
  id: number;
  index: number;
  name: string;
  plant: Plant;
  params: ZoneParams;
  isLightOn: boolean;
};
