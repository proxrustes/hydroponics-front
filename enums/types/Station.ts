import { StationParams } from "./Params";
import { Zone } from "./Zone";

export type Station = {
  id: number;
  index: number;
  uuid: string;
  name: string;
  zones: Zone[];
  stationParams: StationParams;
};
