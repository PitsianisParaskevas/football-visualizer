export interface HeatPoint {
  x: number;
  y: number;
  value?: number;
}

export type HeatmapCoordinateSystem = "centered" | "pitch" | "percent";

export interface NormalizeHeatmapPointsOptions {
  coordinateSystem?: HeatmapCoordinateSystem;
  pitchWidth?: number;
  pitchHeight?: number;
  excludeOrigin?: boolean;
}
