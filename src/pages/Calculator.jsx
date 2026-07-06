import { useMemo, useState } from "react";
import CalculatorCard from "../components/CalculatorCard.jsx";
import DilutionCalculator from "../calculators/DilutionCalculator.jsx";
import MolarityCalculator from "../calculators/MolarityCalculator.jsx";
import UnitConverter from "../calculators/UnitConverter.jsx";
import RPMRCFCalculator from "../calculators/RPMRCFCalculator.jsx";
import CellSeedingCalculator from "../calculators/CellSeedingCalculator.jsx";
import PCRMixCalculator from "../calculators/PCRMixCalculator.jsx";
import CFUCalculator from "../calculators/CFUCalculator.jsx";
import BufferCalculator from "../calculators/BufferCalculator.jsx";

const calculators = [
  { id: "dilution", title: "Dilution", icon: "🧪", description: "Prepare stock and diluent volumes for any dilution scheme.", component: <DilutionCalculator /> },
  { id: "molarity", title: "Molarity", icon: "🧬", description: "Convert between concentration units and calculate molarity needs.", component: <MolarityCalculator /> },
  { id: "unit", title: "Unit Converter", icon: "🔄", description: "Switch between mL, µL, L, and other common lab units.", component: <UnitConverter /> },
  { id: "rpm", title: "RPM ↔ RCF", icon: "⚙️", description: "Translate rotor speed to relative centrifugal force quickly.", component: <RPMRCFCalculator /> },
  { id: "pcr", title: "PCR Mix", icon: "🧫", description: "Plan PCR reactions with overage and master mix volumes.", component: <PCRMixCalculator /> },
  { id: "cell", title: "Cell Seeding", icon: "🧠", description: "Estimate seeding density and required cell numbers.", component: <CellSeedingCalculator /> },
  { id: "cfu", title: "CFU", icon: "🔬", description: "Calculate colony-forming units from plate counts and dilution factors.", component: <CFUCalculator /> },
  { id: "buffer", title: "Buffer Calculator", icon: "🧴", description: "Determine the stock volume required for a target buffer concentration.", component: <BufferCalculator /> },
];

export default function Calculator() {
  const [activeCalculator, setActiveCalculator] = useState(null);

  const selectedCalculator = useMemo(() => {
    return calculators.find((tool) => tool.id === activeCalculator) ?? null;
  }, [activeCalculator]);

  return (
    <div>
      <h2>Calculator Hub 🧮</h2>
      <p style={{ color: "#666", marginTop: -6 }}>Choose a calculation tool to open its workspace.</p>

      {!selectedCalculator ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {calculators.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveCalculator(tool.id)}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 18,
                background: "#fff",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{tool.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{tool.title}</div>
              <div style={{ color: "#666", fontSize: 14 }}>{tool.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveCalculator(null)} style={{ marginBottom: 16, padding: "8px 14px", cursor: "pointer" }}>
            ← Back to calculator hub
          </button>
          <CalculatorCard style={{ maxWidth: 560 }}>
            <h3 style={{ marginTop: 0 }}>{selectedCalculator.icon} {selectedCalculator.title}</h3>
            <p style={{ color: "#666", marginTop: -4 }}>{selectedCalculator.description}</p>
            {selectedCalculator.component}
          </CalculatorCard>
        </div>
      )}
    </div>
  );
}
