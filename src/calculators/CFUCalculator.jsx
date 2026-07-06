import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

export default function CFUCalculator() {
  const [colonies, setColonies] = useState(120);
  const [dilutionFactor, setDilutionFactor] = useState(1e6);
  const [volumePlated, setVolumePlated] = useState(0.1);
  const [message, setMessage] = useState("");

  const cfuPerMl = useMemo(() => {
    const value = (colonies * dilutionFactor) / volumePlated;
    return Number.isFinite(value) ? value : 0;
  }, [colonies, dilutionFactor, volumePlated]);

  function saveToNotebook() {
    saveCalculatorEntry({
      calculatorName: "CFU Calculator",
      inputs: {
        Colonies: colonies,
        "Dilution factor": dilutionFactor,
        "Volume plated (mL)": volumePlated,
      },
      result: {
        "CFU/mL": cfuPerMl.toExponential(3),
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="number" value={colonies} onChange={(e) => setColonies(Number(e.target.value) || 0)} placeholder="Colonies counted" style={{ padding: 8 }} />
      <input type="number" value={dilutionFactor} onChange={(e) => setDilutionFactor(Number(e.target.value) || 0)} placeholder="Dilution factor" style={{ padding: 8 }} />
      <input type="number" value={volumePlated} onChange={(e) => setVolumePlated(Number(e.target.value) || 0)} placeholder="Volume plated (mL)" style={{ padding: 8 }} />
      <div><strong>CFU/mL:</strong> {cfuPerMl.toExponential(3)}</div>
      <button onClick={saveToNotebook} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}>
        Save
      </button>
      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}
