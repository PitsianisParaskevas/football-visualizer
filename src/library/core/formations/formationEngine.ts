import {
  type FormationLayoutOptions,
  type FormationZone,
  type GeneratedPlayerPosition,
  type PitchDimensions,
  type TeamSide,
} from "./formationTypes";
import { validateFormation } from "./formationParser";

function distributeY(count: number, span: number): number[] {
  if (count === 1) return [0];

  const step = (span * 2) / (count - 1);
  return Array.from({ length: count }, (_, i) => -span + i * step);
}

function getLineXPositions(
  lineCount: number,
  defensiveLineX: number,
  attackingLineX: number,
): number[] {
  if (lineCount === 1) {
    return [(defensiveLineX + attackingLineX) / 2];
  }

  const step = (defensiveLineX - attackingLineX) / (lineCount - 1);

  return Array.from({ length: lineCount }, (_, i) => defensiveLineX - i * step);
}

function getZone(
  role: "GK" | "OUTFIELD",
  lineIndex: number,
  totalLines: number,
): FormationZone {
  if (role === "GK") return "goalkeeper";
  if (lineIndex === 0) return "defense";
  if (lineIndex === totalLines - 1) return "attack";
  return "midfield";
}

export function generateFormationPositions(
  formation: string,
  pitch: PitchDimensions,
  side: TeamSide,
  options: FormationLayoutOptions = {},
): GeneratedPlayerPosition[] {
  const {
    gkX = 0.95,
    defensiveLineX = 0.62,
    attackingLineX = 0.12,
    defensiveWidth = 0.82,
    midfieldWidth = 0.62,
    attackingWidth = 0.68,
    allowIncomplete = false,
  } = options;

  const parsed = validateFormation(formation, allowIncomplete);

  const halfWidth = pitch.width / 2;
  const halfHeight = pitch.height / 2;
  const direction = side === "home" ? -1 : 1;

  const xLines = getLineXPositions(
    parsed.lines.length,
    defensiveLineX,
    attackingLineX,
  );

  const positions: GeneratedPlayerPosition[] = [];

  // GK
  positions.push({
    x: direction * gkX * halfWidth,
    y: 0,
    role: "GK",
    zone: "goalkeeper",
    lineIndex: -1,
    playerIndex: 0,
  });

  parsed.lines.forEach((playerCount, lineIndex) => {
    const xNorm = xLines[lineIndex];

    const span =
      lineIndex === 0
        ? defensiveWidth
        : lineIndex === parsed.lines.length - 1
          ? attackingWidth
          : midfieldWidth;

    const yPositions = distributeY(playerCount, span);

    yPositions.forEach((yNorm, playerIndex) => {
      positions.push({
        x: direction * xNorm * halfWidth,
        y: yNorm * halfHeight,
        role: "OUTFIELD",
        zone: getZone("OUTFIELD", lineIndex, parsed.lines.length),
        lineIndex,
        playerIndex,
      });
    });
  });

  return positions;
}
