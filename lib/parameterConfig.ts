import { ParameterProps } from "../enums/types/Params";

type ParameterConfig = {
    [key in "temperature" | "airHumidity" |
    "substrateHumidity" | "phLevel" | "solutionLvl" 
    | "nutrientConcentration"| "solutionTemperature"]: {
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
    airHumidity: {
        name: "Air Humidity",
        valueFormatter: "%",
        icon: "💧",
    },
    substrateHumidity: {
        name: "Substrate Humidity",
        valueFormatter: "%",
        icon: "🪴",
    },
    phLevel: {
        name: "pH Level",
        valueFormatter: "",
        icon: "🧪",
    },
    solutionLvl: {
        name: "Solution Level",
        valueFormatter: "%",
        icon: "〰️",
    },
    solutionTemperature: {
        name: "Solution Temperature",
        valueFormatter: "°C",
        icon: "🌡️",
    },
    nutrientConcentration: {
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
    console.log("createParameters", params)
    return keys
        .filter((key) => parameterConfig[key] && (params[key] !== undefined))
        .map((key) => ({
            ...parameterConfig[key],
            value: params[key] ?? 0,
            norm: Array.isArray(norm) ? norm : norm[key] ?? [0, 0],
        }));
}
