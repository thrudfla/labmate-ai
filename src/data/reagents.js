/**
 * Common laboratory reagents with molar mass data, including hydrated forms.
 * Used by Molarity Calculator (and future calculators) so users don't have
 * to look up or manually enter molecular weights.
 *
 * Molar mass in g/mol. Hydrates are listed as separate entries since their
 * molar mass differs significantly from the anhydrous form.
 */

export const REAGENTS = [
  { id: "nacl", name: "Sodium chloride (NaCl)", molarMass: 58.44 },
  { id: "kcl", name: "Potassium chloride (KCl)", molarMass: 74.55 },
  { id: "tris-base", name: "Tris base", molarMass: 121.14 },
  { id: "tris-hcl", name: "Tris-HCl", molarMass: 157.6 },
  { id: "glycine", name: "Glycine", molarMass: 75.07 },
  { id: "glucose", name: "Glucose (Dextrose)", molarMass: 180.16 },
  { id: "edta-free-acid", name: "EDTA (free acid)", molarMass: 292.24 },
  { id: "edta-na2-2h2o", name: "EDTA disodium salt dihydrate", molarMass: 372.24 },
  { id: "sds", name: "Sodium dodecyl sulfate (SDS)", molarMass: 288.38 },
  { id: "mgcl2-6h2o", name: "Magnesium chloride hexahydrate (MgCl₂·6H₂O)", molarMass: 203.3 },
  { id: "mgcl2-anhydrous", name: "Magnesium chloride, anhydrous (MgCl₂)", molarMass: 95.21 },
  { id: "cacl2-2h2o", name: "Calcium chloride dihydrate (CaCl₂·2H₂O)", molarMass: 147.01 },
  { id: "cacl2-anhydrous", name: "Calcium chloride, anhydrous (CaCl₂)", molarMass: 110.98 },
  { id: "nah2po4-h2o", name: "Sodium phosphate monobasic monohydrate (NaH₂PO₄·H₂O)", molarMass: 137.99 },
  { id: "na2hpo4-7h2o", name: "Sodium phosphate dibasic heptahydrate (Na₂HPO₄·7H₂O)", molarMass: 268.07 },
  { id: "na2hpo4-anhydrous", name: "Sodium phosphate dibasic, anhydrous (Na₂HPO₄)", molarMass: 141.96 },
  { id: "kh2po4", name: "Potassium phosphate monobasic (KH₂PO₄)", molarMass: 136.09 },
  { id: "k2hpo4", name: "Potassium phosphate dibasic (K₂HPO₄)", molarMass: 174.18 },
  { id: "sodium-acetate-3h2o", name: "Sodium acetate trihydrate", molarMass: 136.08 },
  { id: "acetic-acid", name: "Acetic acid, glacial", molarMass: 60.05 },
  { id: "hepes", name: "HEPES", molarMass: 238.3 },
  { id: "imidazole", name: "Imidazole", molarMass: 68.08 },
  { id: "urea", name: "Urea", molarMass: 60.06 },
  { id: "sucrose", name: "Sucrose", molarMass: 342.3 },
  { id: "custom", name: "Custom (enter molar mass manually)", molarMass: null },
];

export function findReagentById(id) {
  return REAGENTS.find((reagent) => reagent.id === id) ?? null;
}
