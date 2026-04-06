import type { ParsedFormation } from "./formationTypes";

export function parseFormation(input: string): ParsedFormation {
  const lines = input
    .split("-")
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value) && value > 0);

  const outfieldCount = lines.reduce((sum, value) => sum + value, 0);

  return {
    lines,
    outfieldCount,
    totalCount: outfieldCount + 1, // +1 GK always
  };
}

export function validateFormation(
  input: string,
  allowIncomplete = false,
): ParsedFormation {
  const parsed = parseFormation(input);

  if (parsed.lines.length === 0) {
    throw new Error("Formation must contain at least one line.");
  }

  if (!allowIncomplete && parsed.outfieldCount !== 10) {
    throw new Error(
      `Formation "${input}" is invalid. Expected 10 outfield players, got ${parsed.outfieldCount}.`,
    );
  }

  return parsed;
}
