import { useMemo, useState } from "react";
import { saveCalculatorEntry } from "../utils/notebookStorage.js";

function formatWholeNumber(value) {
  return Number.isFinite(value) ? Math.round(value).toLocaleString() : "0";
}

function formatVolume(value) {
  return Number.isFinite(value) ? value.toFixed(3) : "0.000";
}

export default function CellSeedingCalculator() {
  const [cellsPerWell, setCellsPerWell] = useState(50000);
  const [numberOfWells, setNumberOfWells] = useState(6);
  const [volumePerWell, setVolumePerWell] = useState(2); // mL
  const [stockConcentration, setStockConcentration] = useState(1000000); // cells/mL
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const perWell = Number(cellsPerWell);
    const wells = Number(numberOfWells);
    const volPerWell = Number(volumePerWell);
    const stockConc = Number(stockConcentration);

    if ([perWell, wells, volPerWell, stockConc].some((value) => !Number.isFinite(value) || value <= 0)) {
      return { error: "Enter positive values for all inputs." };
    }

    const totalCells = perWell * wells;
    const totalVolume = volPerWell * wells;
    const stockVolume = totalCells / stockConc;
    const mediaVolume = totalVolume - stockVolume;

    if (stockVolume > totalVolume) {
      return {
        error: "Stock suspension is too dilute for this seeding density and final volume. Use a more concentrated stock.",
      };
    }

    return { totalCells, totalVolume, stockVolume, mediaVolume, error: "" };
  }, [cellsPerWell, numberOfWells, volumePerWell, stockConcentration]);

  function saveToNotebook() {
    if (result.error || result.stockVolume === undefined) {
      setMessage("Solve the calculation first before saving.");
      return;
    }

    saveCalculatorEntry({
      calculatorName: "Cell Seeding Calculator",
      inputs: {
        "Cells per well": cellsPerWell,
        "Number of wells": numberOfWells,
        "Volume per well (mL)": volumePerWell,
        "Stock concentration (cells/mL)": stockConcentration,
      },
      result: {
        "Total cells needed": formatWholeNumber(result.totalCells),
        "Stock volume needed": `${formatVolume(result.stockVolume)} mL`,
        "Media volume to add": `${formatVolume(result.mediaVolume)} mL`,
      },
    });
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Cells per well</span>
          <input
            type="number"
            min="0"
            step="any"
            value={cellsPerWell}
            onChange={(e) => setCellsPerWell(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Number of wells</span>
          <input
            type="number"
            min="0"
            step="1"
            value={numberOfWells}
            onChange={(e) => setNumberOfWells(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Volume per well (mL)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={volumePerWell}
            onChange={(e) => setVolumePerWell(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Stock concentration (cells/mL)</span>
          <input
            type="number"
            min="0"
            step="any"
            value={stockConcentration}
            onChange={(e) => setStockConcentration(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
        </label>
      </div>

      <div style={{ padding: 16, borderRadius: 14, background: "#f7fcf9", border: "1px solid #e3efe8" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2f6a57", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Result
        </div>
        {result.error ? (
          <div style={{ marginTop: 8, color: "#a33" }}>{result.error}</div>
        ) : (
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            <div><strong>Total cells needed:</strong> {formatWholeNumber(result.totalCells)}</div>
            <div><strong>Stock volume needed:</strong> {formatVolume(result.stockVolume)} mL</div>
            <div><strong>Media volume to add:</strong> {formatVolume(result.mediaVolume)} mL</div>
            <div style={{ color: "#5f6b7a", fontSize: 13 }}>
              Total final volume: {formatVolume(result.totalVolume)} mL across {numberOfWells} well(s)
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={saveToNotebook}
          disabled={Boolean(result.error) || result.stockVolume === undefined}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
        >
          Save to Lab Notebook
        </button>
      </div>

      {message ? <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div> : null}
    </div>
  );
}