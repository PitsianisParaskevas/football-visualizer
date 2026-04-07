import type { HeatPoint } from "./heatmapTypes";

export interface DensityPoint extends HeatPoint {
  density: number;
  normalizedDensity: number;
}

export interface BuildHeatmapDensityOptions {
  kernelRadius?: number;
}

export function buildHeatmapDensity(
  points: HeatPoint[],
  { kernelRadius = 8 }: BuildHeatmapDensityOptions = {},
): DensityPoint[] {
  if (points.length === 0) return [];

  const sigma = kernelRadius;
  const twoSigmaSquared = 2 * sigma * sigma;

  const weighted = points.map((point, index) => {
    let density = 0;

    for (let i = 0; i < points.length; i += 1) {
      const other = points[i];
      const dx = point.x - other.x;
      const dy = point.y - other.y;
      const distanceSquared = dx * dx + dy * dy;
      const weight = other.value ?? 1;

      density += Math.exp(-distanceSquared / twoSigmaSquared) * weight;
    }

    return {
      ...point,
      density,
      index,
    };
  });

  const maxDensity = Math.max(...weighted.map((point) => point.density), 1);

  return weighted.map(({ index: _index, ...point }) => ({
    ...point,
    normalizedDensity: point.density / maxDensity,
  }));
}
