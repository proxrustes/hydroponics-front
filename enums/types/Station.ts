import { StationParams } from "./Params";
import { Zone } from "./Zone";

export type Station = {
  id: number,
  name: string,
  zones: Zone[],
  stationParams: StationParams
}
