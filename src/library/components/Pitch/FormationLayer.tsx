// src/library/components/Pitch/FormationLayer.tsx
import { generateFormationPositions } from "../../core/formations/formationEngine";
import type {
  FormationLayoutOptions,
  PitchDimensions,
  TeamSide,
} from "../../core/formations/formationTypes";
import { PlayerMarker } from "./PlayerMarker";

export interface FormationLayerProps {
  formation: string;
  color: string;
  side: TeamSide;
  pitch?: PitchDimensions;
  layout?: FormationLayoutOptions;
  markerRadius?: number;
}

export function FormationLayer({
  formation,
  color,
  side,
  pitch = { width: 105, height: 68 },
  layout,
  markerRadius = 0.9,
}: FormationLayerProps) {
  const players = generateFormationPositions(formation, pitch, side, layout);

  return (
    <g data-layer="formation">
      {players.map((player, index) => (
        <PlayerMarker
          key={`${formation}-${side}-${index}`}
          x={player.x}
          y={player.y}
          color={color}
          radius={markerRadius}
        />
      ))}
    </g>
  );
}
