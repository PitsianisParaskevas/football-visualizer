export interface HeatPoint {
  x: number;
  y: number;
  value?: number;
}

export type HeatmapCoordinateSystem = "centered" | "percent" | "pitch";

export interface NormalizeHeatmapPointsOptions {
  coordinateSystem?: HeatmapCoordinateSystem;
  pitchWidth?: number;
  pitchHeight?: number;
}
