export type ZoneParams = {
  temperature: number;
  airHumidity: number;
  substrateHumidity: number;
};

export type ZoneParamNorms = {
  temperature: [number, number];
  airHumidity: [number, number];
  substrateHumidity: [number, number];
};

export type StationParams = {
  phLevel: number;
  nutrientConcentration: number;
  solutionTemperature: number;
  solutionLvl: number;
};

export type StationParamNorms = {
  phLevel: [number, number];
  nutrientConcentration: [number, number];
  solutionTemperature: [number, number];
  solutionLvl: [number, number];
  lightIntensity: [number, number];
};
