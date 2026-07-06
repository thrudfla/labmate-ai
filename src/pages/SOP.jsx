import { useState } from "react";
import Card from "../components/Card.jsx";
import { callClaude } from "../claude.js";

export default function SOP({ history, setHistory }) {
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

      <Card title="Create SOP" style={{ maxWidth: 640 }}>
        <div style={{ display: "grid", gap: 10 }}>
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

        <div style={{ marginTop: 16 }}>
          <button onClick={generateSOP} style={{ padding: "8px 16px" }}>
            Generate Prompt
          </button>

          {result ? (
            <button
              onClick={() => copyResult(result)}
              style={{ marginLeft: 12, padding: "8px 16px" }}
            >
              Copy Result
            </button>
          ) : null}
        </div>

        {result ? <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</pre> : null}
      </Card>

      <Card title="Saved SOPs" style={{ maxWidth: 640, marginTop: 20 }}>
        {history.length === 0 ? <p>No saved SOPs</p> : null}

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
      </Card>
    </div>
  );
}
