import { generateFormationPositions } from "../../core/formations/formationEngine";
import type {
  FormationLayoutOptions,
  FormationZone,
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
  visibleZones?: FormationZone[];
}

const DEFAULT_VISIBLE_ZONES: FormationZone[] = [
  "goalkeeper",
  "defense",
  "midfield",
  "attack",
];

export function FormationLayer({
  formation,
  color,
  side,
  pitch = { width: 105, height: 68 },
  layout,
  markerRadius = 0.9,
  visibleZones = DEFAULT_VISIBLE_ZONES,
}: FormationLayerProps) {
  const players = generateFormationPositions(formation, pitch, side, layout);

  const filteredPlayers = players.filter((player) =>
    visibleZones.includes(player.zone),
  );

  return (
    <g data-layer="formation">
      {filteredPlayers.map((player, index) => (
        <PlayerMarker
          key={`${formation}-${side}-${player.zone}-${player.lineIndex}-${player.playerIndex}-${index}`}
          x={player.x}
          y={player.y}
          color={color}
          radius={markerRadius}
        />
      ))}
    </g>
  );
}
