import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

export default function BufferCalculator() {
  const [stockConcentration, setStockConcentration] = useState(10);
  const [targetConcentration, setTargetConcentration] = useState(1);
  const [targetVolume, setTargetVolume] = useState(100);
  const [message, setMessage] = useState("");

  const stockVolume = useMemo(() => {
    const value = (targetConcentration * targetVolume) / stockConcentration;
    return Number.isFinite(value) ? value : 0;
  }, [stockConcentration, targetConcentration, targetVolume]);

  function saveToNotebook() {
    saveCalculatorEntry({
      calculatorName: "Buffer Calculator",
      inputs: {
        "Stock concentration": stockConcentration,
        "Target concentration": targetConcentration,
        "Target volume (mL)": targetVolume,
      },
      result: {
        "Stock volume needed": `${stockVolume.toFixed(2)} mL`,
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input type="number" value={stockConcentration} onChange={(e) => setStockConcentration(Number(e.target.value) || 0)} placeholder="Stock concentration" style={{ padding: 8 }} />
      <input type="number" value={targetConcentration} onChange={(e) => setTargetConcentration(Number(e.target.value) || 0)} placeholder="Target concentration" style={{ padding: 8 }} />
      <input type="number" value={targetVolume} onChange={(e) => setTargetVolume(Number(e.target.value) || 0)} placeholder="Target volume (mL)" style={{ padding: 8 }} />
      <div><strong>Stock volume needed:</strong> {stockVolume.toFixed(2)} mL</div>
      <button onClick={saveToNotebook} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}>
        Save
      </button>
      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}
