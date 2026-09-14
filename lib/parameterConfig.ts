import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";

type ParameterConfig = {
  [key in
    | "temperature"
    | "airHumidity"
    | "substrateHumidity"
    | "phLevel"
    | "solutionLvl"
    | "nutrientConcentration"
    | "solutionTemperature"]: {
    name: string;
    valueFormatter?: string;
    icon: ComponentType<SvgIconProps>;
  };
};

export const parameterConfig: ParameterConfig = {
  temperature: {
    name: "Temperature",
    valueFormatter: "°C",
    icon: ThermostatOutlinedIcon,
  },
  airHumidity: {
    name: "Air Humidity",
    valueFormatter: "%",
    icon: WaterDropOutlinedIcon,
  },
  substrateHumidity: {
    name: "Substrate Humidity",
    valueFormatter: "%",
    icon: GrassOutlinedIcon,
  },
  phLevel: {
    name: "pH Level",
    valueFormatter: "",
    icon: ScienceOutlinedIcon,
  },
  solutionLvl: {
    name: "Solution Level",
    valueFormatter: "%",
    icon: WavesOutlinedIcon,
  },
  solutionTemperature: {
    name: "Solution Temperature",
    valueFormatter: "°C",
    icon: ThermostatOutlinedIcon,
  },
  nutrientConcentration: {
    name: "Nutrient Concentration",
    valueFormatter: "%",
    icon: BiotechOutlinedIcon,
  },
};

export function createParameters<T>(
  keys: readonly string[],
  parameterConfig: Record<string, Omit<any, "value" | "norm" | "target">>,
  params: Record<string, number>,
  norm?: Record<string, [number, number]> | [number, number],
  target?: Record<string, number>
): any[] {
  return keys
    .filter((key) => parameterConfig[key] && params[key] !== undefined)
    .map((key) => ({
      ...parameterConfig[key],
      value: params[key] ?? 0,
      norm: !norm
        ? undefined
        : Array.isArray(norm)
        ? norm
        : norm[key] ?? undefined,
      target: target?.[key],
    }));
}
