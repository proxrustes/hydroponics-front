import { ParameterProps, StationParams, ZoneParams } from "./Params";

type ParameterConfig = {
    [key in "temperature" | "air_humidity" | "substrate_humidity" | "ph_level" | "solution_lvl" | "nutrient_concentration" | "solution_temperature"]: {
        name: string;
        valueFormatter?: string;
        icon: string;
    };
};

export const parameterConfig: ParameterConfig = {
    temperature: {
        name: "Temperature",
        valueFormatter: "°C",
        icon: "🌡️",
    },
    air_humidity: {
        name: "Air Humidity",
        valueFormatter: "%",
        icon: "💧",
    },
    substrate_humidity: {
        name: "Substrate Humidity",
        valueFormatter: "%",
        icon: "🪴",
    },
    ph_level: {
        name: "pH Level",
        valueFormatter: "",
        icon: "🧪",
    },
    solution_lvl: {
        name: "Solution Level",
        valueFormatter: "%",
        icon: "〰️",
    },
    solution_temperature: {
        name: "Solution Temperature",
        valueFormatter: "°C",
        icon: "🌡️",
    },
    nutrient_concentration: {
        name: "Nutrient Concentration",
        valueFormatter: "%",
        icon: "〰️",
    },
};

export function createParameters<T>(
    keys: readonly string[],
    parameterConfig: Record<string, Omit<ParameterProps, "value" | "norm">>,
    params: Record<string, number>,
    norm: Record<string, [number, number]> | [number, number]
  ): ParameterProps[] {
    return keys.map((key) => ({
      ...parameterConfig[key],
      value: params[key],
      norm: Array.isArray(norm) ? norm : norm[key],
    }));
  }
  