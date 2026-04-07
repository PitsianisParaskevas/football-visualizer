import { useId } from "react";
import type { HeatPoint } from "../../core/heatmap/heatmapTypes";

export interface HeatmapLayerProps {
  points: HeatPoint[];
  color?: string;
  radius?: number;
  opacity?: number;
  blur?: number;
}

export function HeatmapLayer({
  points,
  color = "#ff3b30",
  radius = 3.2,
  opacity = 0.16,
  blur = 4,
}: HeatmapLayerProps) {
  const filterId = useId();

  return (
    <g data-layer="heatmap">
      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {points.map((point, index) => (
          <circle
            key={`heat-${index}`}
            cx={point.x}
            cy={point.y}
            r={radius}
            fill={color}
            opacity={Math.max(0, Math.min(1, (point.value ?? 1) * opacity))}
            stroke="none"
          />
        ))}
      </g>
    </g>
  );
}
