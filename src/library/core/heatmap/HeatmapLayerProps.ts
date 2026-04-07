import type { HeatPoint, HeatmapCoordinateSystem } from "./heatmapTypes";

export interface HeatmapLayerProps {
  points: HeatPoint[];
  color?: string;
  radius?: number;
  opacity?: number;
  blur?: number;
  coordinateSystem?: HeatmapCoordinateSystem;
  pitchWidth?: number;
  pitchHeight?: number;
  excludeOrigin?: boolean;
}
