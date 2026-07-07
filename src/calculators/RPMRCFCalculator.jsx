import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

const RCF_CONSTANT = 1.118e-5;

function formatValue(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

export default function RPMRCFCalculator() {
  const [mode, setMode] = useState("rpmToRcf"); // "rpmToRcf" | "rcfToRpm"
  const [radius, setRadius] = useState(10); // cm
  const [rpm, setRpm] = useState(3000);
  const [rcf, setRcf] = useState(1000);
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const r = Number(radius);

    if (!Number.isFinite(r) || r <= 0) {
      return { value: null, error: "Enter a positive rotor radius." };
    }

    if (mode === "rpmToRcf") {
      const n = Number(rpm);
      if (!Number.isFinite(n) || n <= 0) {
        return { value: null, error: "Enter a positive RPM value." };
      }
      const value = RCF_CONSTANT * r * n * n;
      return { value, error: "" };
    }

    const targetRcf = Number(rcf);
    if (!Number.isFinite(targetRcf) || targetRcf <= 0) {
      return { value: null, error: "Enter a positive RCF value." };
    }
    const value = Math.sqrt(targetRcf / (RCF_CONSTANT * r));
    return { value, error: "" };
  }, [mode, radius, rpm, rcf]);

  function saveToNotebook() {
    if (result.value === null) {
      setMessage("Solve the conversion first before saving.");
      return;
    }

    saveCalculatorEntry({
      calculatorName: "RPM \u2194 RCF Calculator",
      inputs: {
        Mode: mode === "rpmToRcf" ? "RPM \u2192 RCF" : "RCF \u2192 RPM",
        "Rotor radius (cm)": radius,
        ...(mode === "rpmToRcf" ? { RPM: rpm } : { "RCF (\u00d7g)": rcf }),
      },
      result: {
        [mode === "rpmToRcf" ? "RCF (\u00d7g)" : "RPM"]: formatValue(result.value),
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setMode("rpmToRcf")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: mode === "rpmToRcf" ? "1px solid #2f6a57" : "1px solid #c9d8cf",
            background: mode === "rpmToRcf" ? "#2f6a57" : "#fff",
            color: mode === "rpmToRcf" ? "#fff" : "#333",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          RPM → RCF
        </button>
        <button
          onClick={() => setMode("rcfToRpm")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: mode === "rcfToRpm" ? "1px solid #2f6a57" : "1px solid #c9d8cf",
            background: mode === "rcfToRpm" ? "#2f6a57" : "#fff",
            color: mode === "rcfToRpm" ? "#fff" : "#333",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          RCF → RPM
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Rotor radius (cm)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        {mode === "rpmToRcf" ? (
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Speed (RPM)</span>
            <input
              type="number"
              min="0"
              step="any"
              value={rpm}
              onChange={(e) => setRpm(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
            />
          </label>
        ) : (
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Target RCF (× g)</span>
            <input
              type="number"
              min="0"
              step="any"
              value={rcf}
              onChange={(e) => setRcf(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
            />
          </label>
        )}
      </div>

      <div style={{ padding: 16, borderRadius: 14, background: "#f7fcf9", border: "1px solid #e3efe8" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2f6a57", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Result
        </div>
        {result.error ? (
          <div style={{ marginTop: 8, color: "#a33" }}>{result.error}</div>
        ) : (
          <div style={{ marginTop: 10 }}>
            <strong>{mode === "rpmToRcf" ? "RCF" : "Speed"}:</strong>{" "}
            {formatValue(result.value)} {mode === "rpmToRcf" ? "× g" : "RPM"}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={saveToNotebook}
          disabled={result.value === null}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
        >
          Save to Lab Notebook
        </button>
      </div>

      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}