import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";
import { calculateMolarityMass } from "../utils/calculations/molarity.js";
import { MOLAR_CONCENTRATION_UNITS, VOLUME_UNITS, toSignificantFigures } from "../utils/units.js";
import { REAGENTS, findReagentById } from "../data/reagents.js";
import CalculatorField from "../components/calculator/CalculatorField.jsx";
import ResultPanel from "../components/calculator/ResultPanel.jsx";
import SaveToNotebookButton from "../components/calculator/SaveToNotebookButton.jsx";

export default function MolarityCalculator() {
  const [reagentId, setReagentId] = useState("nacl");
  const [customMolarMass, setCustomMolarMass] = useState("");

  const [concentration, setConcentration] = useState(1);
  const [concentrationUnit, setConcentrationUnit] = useState("M");
  const [volume, setVolume] = useState(100);
  const [volumeUnit, setVolumeUnit] = useState("mL");

  const selectedReagent = findReagentById(reagentId);
  const isCustom = reagentId === "custom";
  const molarMass = isCustom ? customMolarMass : selectedReagent?.molarMass;

  const result = useMemo(
    () =>
      calculateMolarityMass({
        concentration,
        concentrationUnit,
        molarMass,
        volume,
        volumeUnit,
      }),
    [concentration, concentrationUnit, molarMass, volume, volumeUnit]
  );

  function handleSave() {
    saveCalculatorEntry({
      calculatorName: "Molarity Calculator",
      inputs: {
        Reagent: isCustom ? "Custom" : selectedReagent?.name,
        "Molar mass (g/mol)": molarMass,
        Concentration: `${concentration} ${concentrationUnit}`,
        Volume: `${volume} ${volumeUnit}`,
      },
      result: {
        "Mass required": `${toSignificantFigures(result.massInGrams, 4)} g`,
      },
    });
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 600 }}>Reagent</span>
        <select
          value={reagentId}
          onChange={(e) => setReagentId(e.target.value)}
          style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
        >
          {REAGENTS.map((reagent) => (
            <option key={reagent.id} value={reagent.id}>
              {reagent.name}
            </option>
          ))}
        </select>
      </label>

      {isCustom && (
        <CalculatorField
          label="Molar mass (g/mol)"
          value={customMolarMass}
          onChange={setCustomMolarMass}
        />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <CalculatorField
          label="Target concentration"
          value={concentration}
          onChange={setConcentration}
          unit={concentrationUnit}
          unitOptions={Object.keys(MOLAR_CONCENTRATION_UNITS)}
          onUnitChange={setConcentrationUnit}
        />

        <CalculatorField
          label="Target volume"
          value={volume}
          onChange={setVolume}
          unit={volumeUnit}
          unitOptions={Object.keys(VOLUME_UNITS).filter((unit) => unit !== "nL")}
          onUnitChange={setVolumeUnit}
        />
      </div>

      <ResultPanel
        error={result.error}
        formula={result.formula}
        rows={[{ label: "Mass required", value: `${toSignificantFigures(result.massInGrams, 4)} g` }]}
      />

      <SaveToNotebookButton onSave={handleSave} disabled={Boolean(result.error)} />
    </div>
  );
}