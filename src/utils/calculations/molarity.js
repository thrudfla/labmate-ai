import { toMolar, toLiters } from "../units.js";

export function calculateMolarityMass({
  concentration,
  concentrationUnit,
  molarMass,
  volume,
  volumeUnit,
}) {
  const conc = Number(concentration);
  const mw = Number(molarMass);
  const vol = Number(volume);

  if (![conc, mw, vol].every((value) => Number.isFinite(value) && value > 0)) {
    return { massInGrams: null, error: "Enter positive values for concentration, molar mass, and volume." };
  }

  const molarityInM = toMolar(conc, concentrationUnit);
  const volumeInLiters = toLiters(vol, volumeUnit);
  const massInGrams = molarityInM * mw * volumeInLiters;

  return {
    massInGrams,
    error: null,
    formula: `mass (g) = ${conc} ${concentrationUnit} × ${mw} g/mol × ${vol} ${volumeUnit} = ${massInGrams.toPrecision(4)} g`,
  };
}