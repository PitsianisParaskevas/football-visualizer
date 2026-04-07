import type { HeatPoint, NormalizeHeatmapPointsOptions } from "./heatmapTypes";

export function normalizeHeatmapPoints(
  points: HeatPoint[],
  {
    coordinateSystem = "centered",
    pitchWidth = 105,
    pitchHeight = 68,
    excludeOrigin = false,
  }: NormalizeHeatmapPointsOptions = {},
): HeatPoint[] {
  return points
    .filter((point) => {
      if (!excludeOrigin) return true;
      return !(point.x === 0 && point.y === 0);
    })
    .map((point) => {
      if (coordinateSystem === "centered") {
        return point;
      }

      if (coordinateSystem === "pitch") {
        return {
          ...point,
          x: point.x - pitchWidth / 2,
          y: point.y - pitchHeight / 2,
        };
      }

      return {
        ...point,
        x: (point.x / 100) * pitchWidth - pitchWidth / 2,
        y: (point.y / 100) * pitchHeight - pitchHeight / 2,
      };
    });
}
