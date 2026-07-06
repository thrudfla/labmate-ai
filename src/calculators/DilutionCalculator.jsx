import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

function formatValue(value) {
  return Number.isFinite(value) ? value.toFixed(3) : "0.000";
}

export default function DilutionCalculator() {
  const [stockConcentration, setStockConcentration] = useState(10);
  const [finalConcentration, setFinalConcentration] = useState(1);
  const [finalVolume, setFinalVolume] = useState(100);
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const c1 = Number(stockConcentration);
    const c2 = Number(finalConcentration);
    const v2 = Number(finalVolume);

    if ([c1, c2, v2].some((value) => !Number.isFinite(value) || value <= 0)) {
      return { stockVolume: null, diluentVolume: null, error: "Enter positive values for all inputs." };
    }

    const v1 = (c2 * v2) / c1;
    const diluent = v2 - v1;

    if (v1 <= 0 || diluent < 0) {
      return { stockVolume: null, diluentVolume: null, error: "The requested dilution is not feasible with the provided values." };
    }

    return { stockVolume: v1, diluentVolume: diluent, error: "" };
  }, [stockConcentration, finalConcentration, finalVolume]);

  function clearForm() {
    setStockConcentration("");
    setFinalConcentration("");
    setFinalVolume("");
    setMessage("");
  }

  function copyResult() {
    const text = `Dilution Result\nStock Volume: ${formatValue(result.stockVolume)} mL\nDiluent Volume: ${formatValue(result.diluentVolume)} mL`;
    navigator.clipboard.writeText(text);
    setMessage("Result copied to clipboard.");
  }

  function saveToNotebook() {
    if (!result.stockVolume || !result.diluentVolume) {
      setMessage("Solve the dilution first before saving.");
      return;
    }

    saveCalculatorEntry({
      calculatorName: "Dilution Calculator",
      inputs: {
        "Stock Concentration (C1)": stockConcentration,
        "Final Concentration (C2)": finalConcentration,
        "Final Volume (V2)": finalVolume,
      },
      result: {
        "Stock Volume (V1)": `${formatValue(result.stockVolume)} mL`,
        "Diluent Volume": `${formatValue(result.diluentVolume)} mL`,
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Stock Concentration (C1)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={stockConcentration}
            onChange={(e) => setStockConcentration(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Final Concentration (C2)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={finalConcentration}
            onChange={(e) => setFinalConcentration(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Final Volume (V2)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={finalVolume}
            onChange={(e) => setFinalVolume(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>
      </div>

      <div style={{ padding: 16, borderRadius: 14, background: "#f7fcf9", border: "1px solid #e3efe8" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2f6a57", textTransform: "uppercase", letterSpacing: "0.2em" }}>Result</div>
        {result.error ? (
          <div style={{ marginTop: 8, color: "#a33" }}>{result.error}</div>
        ) : (
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            <div><strong>Stock Volume (V1):</strong> {formatValue(result.stockVolume)} mL</div>
            <div><strong>Diluent Volume:</strong> {formatValue(result.diluentVolume)} mL</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button
          onClick={copyResult}
          disabled={!result.stockVolume || !result.diluentVolume}
          style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#2f6a57", color: "#fff", cursor: "pointer" }}
        >
          Copy Result
        </button>
        <button
          onClick={saveToNotebook}
          disabled={!result.stockVolume || !result.diluentVolume}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
        >
          Save to Lab Notebook
        </button>
        <button
          onClick={clearForm}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>

      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}
