import { useState } from "react";
import Card from "../components/Card.jsx";
import { callClaude } from "../claude.js";

export default function Translator() {
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
    <div>
      <h2>Translator 🌍</h2>
      <Card title="Translate text">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste SOP / paper / report"
          style={{ width: "100%", padding: 8 }}
        />
        <button onClick={translateText} disabled={loading} style={{ marginTop: 10, padding: "8px 16px", cursor: "pointer" }}>
          {loading ? "Translating..." : "Translate"}
        </button>
        <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{translated}</pre>
      </Card>
    </div>
  );
}
