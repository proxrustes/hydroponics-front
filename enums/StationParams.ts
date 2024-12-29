import { ZoneParams, StationParams } from "./Params";
import { Plant } from "./Plant";

export type Zone = {
  id: number,
  name: string;
  plant: Plant;
  params: ZoneParams;
  isLightOn: boolean;
}

export type Station = {
  id: number,
  name: string,
  zones: Zone[],
  station_params: StationParams
}
