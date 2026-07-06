import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

export default function PCRMixCalculator() {
  const [reactions, setReactions] = useState(8);
  const [masterMixVolume, setMasterMixVolume] = useState(20);
  const [overage, setOverage] = useState(10);
  const [message, setMessage] = useState("");

  const totalVolume = useMemo(() => {
    const adjusted = reactions * masterMixVolume * (1 + overage / 100);
    return Number.isFinite(adjusted) ? adjusted : 0;
  }, [reactions, masterMixVolume, overage]);

  function saveToNotebook() {
    saveCalculatorEntry({
      calculatorName: "PCR Mix Calculator",
      inputs: {
        Reactions: reactions,
        "Per reaction volume (µL)": masterMixVolume,
        Overage: `${overage}%`,
      },
      result: {
        "Prepared volume": `${totalVolume.toFixed(1)} µL`,
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="number" value={reactions} onChange={(e) => setReactions(Number(e.target.value) || 0)} placeholder="Number of reactions" style={{ padding: 8 }} />
      <input type="number" value={masterMixVolume} onChange={(e) => setMasterMixVolume(Number(e.target.value) || 0)} placeholder="Per reaction volume (µL)" style={{ padding: 8 }} />
      <input type="number" value={overage} onChange={(e) => setOverage(Number(e.target.value) || 0)} placeholder="Overage (%)" style={{ padding: 8 }} />
      <div><strong>Prepared volume:</strong> {totalVolume.toFixed(1)} µL</div>
      <button onClick={saveToNotebook} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}>
        Save
      </button>
      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}
