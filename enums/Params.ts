
export type ZoneParams = {
    temperature: number;
    air_humidity: number;
    substrate_humidity: number;
};

export type ZoneParamNorms = {
    temperature: [number, number];
    air_humidity: [number, number];
    substrate_humidity: [number, number];
};

export type StationParams = {
    ph_level: number;
    nutrient_concentration: number;
    solution_temperature: number;
    solution_lvl: number
  }

  export type StationParamNorms = {
    ph_level: [number, number];
    nutrient_concentration: [number, number];
    solution_temperature: [number, number];
    solution_lvl: [number, number]
    light_intensity: [number, number]
  }