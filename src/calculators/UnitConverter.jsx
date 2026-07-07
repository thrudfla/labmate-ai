import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

// All conversion factors relative to liters (L)
const VOLUME_UNITS = {
  L: 1,
  mL: 1e-3,
  "µL": 1e-6,
  nL: 1e-9,
};

function formatValue(value) {
  if (!Number.isFinite(value)) return "0";
  if (value === 0) return "0";
  if (Math.abs(value) >= 0.001 && Math.abs(value) < 1e6) {
    return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
  }
  return value.toExponential(4);
}

export default function UnitConverter() {
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("mL");
  const [message, setMessage] = useState("");

  const conversions = useMemo(() => {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
      return { error: "Enter a valid number.", values: null };
    }

    const valueInLiters = value * VOLUME_UNITS[unit];

    const values = Object.fromEntries(
      Object.entries(VOLUME_UNITS).map(([unitName, factor]) => [unitName, valueInLiters / factor])
    );

    return { error: "", values };
  }, [amount, unit]);

  function saveToNotebook() {
    if (!conversions.values) {
      setMessage("Enter a value to convert first.");
      return;
    }

    saveCalculatorEntry({
      calculatorName: "Unit Converter (Volume)",
      inputs: {
        Amount: amount,
        Unit: unit,
      },
      result: Object.fromEntries(
        Object.entries(conversions.values).map(([unitName, value]) => [unitName, formatValue(value)])
      ),
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Amount</span>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Unit</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          >
            {Object.keys(VOLUME_UNITS).map((unitName) => (
              <option key={unitName} value={unitName}>
                {unitName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ padding: 16, borderRadius: 14, background: "#f7fcf9", border: "1px solid #e3efe8" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2f6a57", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Converted values
        </div>
        {conversions.error ? (
          <div style={{ marginTop: 8, color: "#a33" }}>{conversions.error}</div>
        ) : (
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {Object.entries(conversions.values).map(([unitName, value]) => (
              <div
                key={unitName}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: unitName === "nL" ? "none" : "1px solid #e3efe8",
                }}
              >
                <span style={{ color: "#5f6b7a" }}>{unitName}</span>
                <strong>{formatValue(value)}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={saveToNotebook}
          disabled={!conversions.values}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
        >
          Save to Lab Notebook
        </button>
      </div>

      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}
