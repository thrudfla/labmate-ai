import { useEffect, useState } from "react";
import { callClaude } from "./claude.js";

export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("sop_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>LabMate AI</h1>

      {/* 메뉴 */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("sop")}>SOP</button>
        <button onClick={() => setPage("calc")}>Calculator</button>
        <button onClick={() => setPage("translate")}>Translate</button>
      </div>

      {/* 화면 */}
      {page === "home" && <Home />}
      {page === "sop" && <SOP history={history} setHistory={setHistory} />}
      {page === "calc" && <Calc />}
      {page === "translate" && <Translate />}
    </div>
  );
}

function Home() {
  return <p>Welcome 👋 Choose a tool.</p>;
}

function SOP({ history, setHistory }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [purpose, setPurpose] = useState("");
  const [scope, setScope] = useState("");
  const [steps, setSteps] = useState("");
  const [result, setResult] = useState("");

  async function generateSOP() {
    const prompt = `
You are a GMP quality assurance expert in a pharmaceutical company.

Write a professional Standard Operating Procedure (SOP).

Title: ${title}
Department: ${department}
Purpose: ${purpose}
Scope: ${scope}
Notes: ${steps}

Format:
1. Purpose
2. Scope
3. Responsibilities
4. Materials & Equipment
5. Procedure (step-by-step)
6. Safety & Precautions
7. Documentation & Records

Make it formal, regulatory-ready, and detailed.
`;

    const text = await callClaude(prompt);
    setResult(text);

    const newItem = {
      title,
      content: text,
      date: new Date().toISOString(),
    };

    const updated = [newItem, ...history];
    setHistory(updated);
    localStorage.setItem("sop_history", JSON.stringify(updated));
  }

  function copyResult(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div>
      <h2>SOP Generator 🧪</h2>

      <div style={{ display: "grid", gap: 10, maxWidth: 540 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        />
        <input
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        />
        <input
          placeholder="Scope"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        />
        <textarea
          placeholder="Notes / steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows={5}
          style={{ padding: 8, width: "100%" }}
        />
      </div>

      <button onClick={generateSOP} style={{ marginTop: 16, padding: "8px 16px" }}>
        Generate Prompt
      </button>

      {result && (
        <button
          onClick={() => copyResult(result)}
          style={{ marginTop: 12, marginLeft: 12, padding: "8px 16px" }}
        >
          Copy Result
        </button>
      )}

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</pre>

      <div style={{ marginTop: 30 }}>
        <h3>📁 Saved SOPs</h3>

        {history.length === 0 && <p>No saved SOPs</p>}

        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => setResult(item.content)}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            <strong>{item.title}</strong>
            <div style={{ fontSize: 12, color: "gray" }}>
              {new Date(item.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function mlToUl(value) {
  return value * 1000;
}

function ulToMl(value) {
  return value / 1000;
}

function Calc() {
  const [v1, setV1] = useState(0);
  const [finalVolume, setFinalVolume] = useState(0);
  const [volUnit, setVolUnit] = useState("mL");
  const [nV2, setNV2] = useState(0);
  const [nC2, setNC2] = useState(0);
  const [c1, setC1] = useState(0);
  const [concUnit, setConcUnit] = useState("mg/mL");
  const [ml, setMl] = useState("");
  const [ul, setUl] = useState("");

  const diluent = Number(finalVolume) - Number(v1);
  const displayDiluent = Number.isFinite(diluent) ? diluent : 0;

  return (
    <div>
      <h2>Dilution Calculator ⚗️</h2>

      <div style={{ display: "grid", gap: 10, maxWidth: 540 }}>
        <input
          type="number"
          placeholder="Stock volume"
          value={v1}
          onChange={(e) => setV1(parseFloat(e.target.value) || 0)}
          style={{ padding: 8, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Final volume"
          value={finalVolume}
          onChange={(e) => setFinalVolume(parseFloat(e.target.value) || 0)}
          style={{ padding: 8, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Target volume"
          value={nV2}
          onChange={(e) => setNV2(parseFloat(e.target.value) || 0)}
          style={{ padding: 8, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Stock concentration"
          value={c1}
          onChange={(e) => setC1(parseFloat(e.target.value) || 0)}
          style={{ padding: 8, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Target concentration"
          value={nC2}
          onChange={(e) => setNC2(parseFloat(e.target.value) || 0)}
          style={{ padding: 8, width: "100%" }}
        />

        <select
          value={volUnit}
          onChange={(e) => setVolUnit(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        >
          <option value="mL">mL</option>
          <option value="L">L</option>
          <option value="µL">µL</option>
        </select>

        <input
          type="text"
          placeholder="Concentration unit"
          value={concUnit}
          onChange={(e) => setConcUnit(e.target.value)}
          style={{ padding: 8, width: "100%" }}
        />
      </div>

      <p style={{ marginTop: 20, color: "#333" }}>
        Mix <b>{v1.toFixed(3)} {volUnit}</b> of stock with <b>{displayDiluent.toFixed(3)} {volUnit}</b> diluent to make <b>{nV2} {volUnit}</b> at <b>{nC2} {concUnit}</b>.
      </p>

      <button
        onClick={() =>
          navigator.clipboard.writeText(
            `V1: ${v1.toFixed(3)} ${volUnit}, Diluent: ${displayDiluent.toFixed(3)} ${volUnit}`
          )
        }
        style={{
          marginTop: 10,
          padding: "6px 10px",
          fontSize: 12,
          border: "1px solid #ccc",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Copy result
      </button>

      <button
        onClick={() => {
          const sopText = `
Dilution Protocol

Stock: ${c1} ${concUnit}
Target: ${nC2} ${concUnit}
Final Volume: ${nV2} ${volUnit}

Step:
1. Take ${v1.toFixed(3)} ${volUnit} stock
2. Add ${displayDiluent.toFixed(3)} ${volUnit} diluent
3. Mix thoroughly
`;
          alert(sopText);
        }}
        style={{
          marginTop: 12,
          marginLeft: 12,
          padding: "6px 10px",
          fontSize: 12,
          border: "1px solid #ccc",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Export as SOP
      </button>

      <div style={{ marginTop: 40 }}>
        <h3>Unit Converter</h3>

        <input
          placeholder="mL"
          value={ml}
          onChange={(e) => setMl(e.target.value)}
          style={{ padding: 8, width: "180px" }}
        />
        <button
          onClick={() => setUl(mlToUl(Number(ml)))}
          style={{ marginLeft: 10, padding: "6px 10px", cursor: "pointer" }}
        >
          mL → µL
        </button>

        <div style={{ marginTop: 10 }}>Result: {ul} µL</div>
      </div>
    </div>
  );
}

function Translate() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  async function translateText() {
    setLoading(true);

    const prompt = `
Translate this laboratory / scientific text into professional English (or Korean if needed).
Keep technical terms 정확하게 유지.

Text:
${text}
`;

    const res = await callClaude(prompt);
    setTranslated(res);

    setLoading(false);
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Translator 🌍</h2>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste SOP / paper / report"
        style={{ width: "100%", padding: 8 }}
      />

      <button
        onClick={translateText}
        disabled={loading}
        style={{ marginTop: 10, padding: "8px 16px", cursor: "pointer" }}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{translated}</pre>
    </div>
  );
}
