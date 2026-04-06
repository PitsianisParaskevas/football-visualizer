interface PlayerMarkerProps {
  x: number;
  y: number;
  color: string;
  radius?: number;
  stroke?: string;
  strokeWidth?: number;
}

export function PlayerMarker({
  x,
  y,
  color,
  radius = 0.9,
  stroke = "#FFFFFF",
  strokeWidth = 0.15,
}: PlayerMarkerProps) {
  return (
    <circle
      cx={x}
      cy={y}
      r={radius}
      fill={color}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}