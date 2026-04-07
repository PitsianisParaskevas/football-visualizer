import type { HeatPoint, NormalizeHeatmapPointsOptions } from "./heatmapTypes";

export function normalizeHeatmapPoints(
  points: HeatPoint[],
  {
    coordinateSystem = "percent",
    pitchWidth = 105,
    pitchHeight = 68,
  }: NormalizeHeatmapPointsOptions = {},
): HeatPoint[] {
  return points.map((point) => {
    if (coordinateSystem === "centered") {
      return point;
    }

    if (coordinateSystem === "pitch") {
      return {
        ...point,
        x: point.x - pitchWidth / 2,
        y: pitchHeight / 2 - point.y,
      };
    }

    return {
      ...point,
      x: (point.x / 100) * pitchWidth - pitchWidth / 2,
      y: pitchHeight / 2 - (point.y / 100) * pitchHeight,
    };
  });
}
