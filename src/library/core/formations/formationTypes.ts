export type PitchOrientation = "horizontal" | "vertical";
export type TeamSide = "home" | "away";

export interface PitchDimensions {
  width: number;
  height: number;
}

export interface ParsedFormation {
  lines: number[];
  outfieldCount: number;
  totalCount: number;
}

export interface FormationLayoutOptions {
  gkX?: number;
  defensiveLineX?: number;
  attackingLineX?: number;
  defensiveWidth?: number;
  midfieldWidth?: number;
  attackingWidth?: number;
  allowIncomplete?: boolean;
}

export type FormationZone = "goalkeeper" | "defense" | "midfield" | "attack";

export interface GeneratedPlayerPosition {
  x: number;
  y: number;
  role: "GK" | "OUTFIELD";
  zone: FormationZone;
  lineIndex: number;
  playerIndex: number;
}
