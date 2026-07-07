/**
 * Central unit conversion utilities for LabMate AI.
 * Every calculator should convert through these functions instead of
 * writing its own conversion factors — keeps unit handling consistent
 * and auditable across the app.
 */

// --- Volume -----------------------------------------------------------
// Base unit: liters (L)
export const VOLUME_UNITS = {
  L: 1,
  mL: 1e-3,
  "µL": 1e-6,
  nL: 1e-9,
};

export function toLiters(value, unit) {
  if (!(unit in VOLUME_UNITS)) {
    throw new Error(`Unknown volume unit: ${unit}`);
  }
  return value * VOLUME_UNITS[unit];
}

export function fromLiters(valueInLiters, unit) {
  if (!(unit in VOLUME_UNITS)) {
    throw new Error(`Unknown volume unit: ${unit}`);
  }
  return valueInLiters / VOLUME_UNITS[unit];
}

export function convertVolume(value, fromUnit, toUnit) {
  return fromLiters(toLiters(value, fromUnit), toUnit);
}

// --- Concentration (molar) ---------------------------------------------
// Base unit: molar (M)
export const MOLAR_CONCENTRATION_UNITS = {
  M: 1,
  mM: 1e-3,
  "µM": 1e-6,
  nM: 1e-9,
};

export function toMolar(value, unit) {
  if (!(unit in MOLAR_CONCENTRATION_UNITS)) {
    throw new Error(`Unknown concentration unit: ${unit}`);
  }
  return value * MOLAR_CONCENTRATION_UNITS[unit];
}

export function fromMolar(valueInMolar, unit) {
  if (!(unit in MOLAR_CONCENTRATION_UNITS)) {
    throw new Error(`Unknown concentration unit: ${unit}`);
  }
  return valueInMolar / MOLAR_CONCENTRATION_UNITS[unit];
}

export function convertMolarConcentration(value, fromUnit, toUnit) {
  return fromMolar(toMolar(value, fromUnit), toUnit);
}

// --- Mass ---------------------------------------------------------------
// Base unit: grams (g)
export const MASS_UNITS = {
  kg: 1e3,
  g: 1,
  mg: 1e-3,
  "µg": 1e-6,
};

export function toGrams(value, unit) {
  if (!(unit in MASS_UNITS)) {
    throw new Error(`Unknown mass unit: ${unit}`);
  }
  return value * MASS_UNITS[unit];
}

export function fromGrams(valueInGrams, unit) {
  if (!(unit in MASS_UNITS)) {
    throw new Error(`Unknown mass unit: ${unit}`);
  }
  return valueInGrams / MASS_UNITS[unit];
}

export function convertMass(value, fromUnit, toUnit) {
  return fromGrams(toGrams(value, fromUnit), toUnit);
}

// --- Formatting -----------------------------------------------------------

/**
 * Formats a number to a fixed number of significant figures (not decimal places).
 * Lab results should be reported in sig figs, not an arbitrary decimal count —
 * toFixed(3) on 0.00042 gives "0.000", which is misleading.
 */
export function toSignificantFigures(value, sigFigs = 3) {
  if (!Number.isFinite(value)) return "0";
  if (value === 0) return "0";

  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const factor = Math.pow(10, sigFigs - 1 - magnitude);
  const rounded = Math.round(value * factor) / factor;

  // Avoid scientific notation for "normal" lab-range numbers; use it outside that range.
  if (Math.abs(rounded) >= 1e-4 && Math.abs(rounded) < 1e6) {
    const decimals = Math.max(0, sigFigs - 1 - magnitude);
    return rounded.toFixed(decimals);
  }

  return rounded.toExponential(sigFigs - 1);
}

// --- Practical warnings -----------------------------------------------------

/**
 * Standard single-channel pipettes are unreliable below ~1 µL and imprecise
 * below ~10 µL. Calculators that output a volume to be pipetted should check
 * this and surface a warning rather than silently reporting an unmeasurable number.
 */
export const MIN_RELIABLE_PIPETTE_VOLUME_L = 1e-6; // 1 µL

export function isBelowPipetteAccuracy(volumeInLiters) {
  return Number.isFinite(volumeInLiters) && volumeInLiters > 0 && volumeInLiters < MIN_RELIABLE_PIPETTE_VOLUME_L;
}