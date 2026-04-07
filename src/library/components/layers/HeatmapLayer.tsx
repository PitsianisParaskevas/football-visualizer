import { useId, useMemo } from "react";
import { normalizeHeatmapPoints } from "../../core/heatmap/normalizeHeatmapPoints";
import { buildHeatmapDensity } from "../../core/heatmap/buildHeatmapDensity";
import type {
  HeatPoint,
  HeatmapCoordinateSystem,
} from "../../core/heatmap/heatmapTypes";

export interface HeatmapLayerProps {
  points: HeatPoint[];
  color?: string;
  radius?: number;
  opacity?: number;
  blur?: number;
  coordinateSystem?: HeatmapCoordinateSystem;
  pitchWidth?: number;
  pitchHeight?: number;
  kernelRadius?: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function HeatmapLayer({
  points,
  color = "#ff5a36",
  radius = 3,
  opacity = 0.3,
  blur = 7,
  coordinateSystem = "percent",
  pitchWidth = 105,
  pitchHeight = 68,
  kernelRadius = 8,
}: HeatmapLayerProps) {
  const rawId = useId();
  const filterId = `heatmap-blur-${rawId.replace(/:/g, "")}`;

  const densityPoints = useMemo(() => {
    const normalizedPoints = normalizeHeatmapPoints(points, {
      coordinateSystem,
      pitchWidth,
      pitchHeight,
    });

    return buildHeatmapDensity(normalizedPoints, {
      kernelRadius,
    });
  }, [points, coordinateSystem, pitchWidth, pitchHeight, kernelRadius]);

  return (
    <g data-layer="heatmap" style={{ mixBlendMode: "screen" }}>
      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>

      <g filter={blur > 0 ? `url(#${filterId})` : undefined}>
        {densityPoints.map((point, index) => {
          const intensity = clamp(point.normalizedDensity, 0, 1);
          const pointRadius = radius * (0.9 + intensity * 0.9);
          const pointOpacity = opacity * (0.2 + intensity * 0.8);

          return (
            <circle
              key={`heat-${index}`}
              cx={point.x}
              cy={point.y}
              r={pointRadius}
              fill={color}
              opacity={pointOpacity}
              stroke="none"
            />
          );
        })}
      </g>
    </g>
  );
}
