import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import { getRecentCalculators } from "../utils/recentCalculators";

const favoriteIcons = {
  "Dilution Calculator": "🧪",
  "PCR Mix Calculator": "🧫",
  "CFU Calculator": "🔬",
  "Buffer Calculator": "🧴",
  default: "🧮",
};

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentCalculators, setRecentCalculators] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("lab_notebook") || "[]");
    const savedCalculations = JSON.parse(localStorage.getItem("calculator_history") || "[]");
    const savedFavorites = JSON.parse(localStorage.getItem("calculator_favorites") || "[]");

    setNotes(savedNotes);
    setCalculations(savedCalculations);
    setFavorites(savedFavorites);

    // ✅ 여기 추가
    setRecentCalculators(getRecentCalculators());
  }, []);

  const todayActivity = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return notes
      .filter((note) => note.date === today)
      .slice(0, 3)
      .map((note) => ({
        title: note.title || note.calculatorUsed || "Notebook Entry",
        time: note.time || "",
        detail: note.calculatorUsed ? `Saved from ${note.calculatorUsed}` : "Notebook updated",
      }));
  }, [notes]);

  const favoriteCalculator = useMemo(() => {
    const counts = calculations.reduce((acc, item) => {
      const name = item.calculatorName || "General";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(counts);
    if (entries.length === 0) {
      return null;
    }

    const [name] = entries.sort((a, b) => b[1] - a[1])[0];
    return { name, icon: favoriteIcons[name] || favoriteIcons.default };
  }, [calculations]);

  const stats = [
    { label: "Total Notes", value: notes.length.toString() },
    { label: "Total Calculations", value: calculations.length.toString() },
    { label: "Favorite Calculator", value: favoriteCalculator?.name || "None yet" },
  ];

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section
        style={{
          background: "linear-gradient(135deg, #eaf7f2 0%, #f7fcfb 100%)",
          border: "1px solid #dcefe6",
          borderRadius: 22,
          padding: "24px 24px 22px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#2f6a57" }}>
              Laboratory workspace
            </div>
            <h2 style={{ margin: "6px 0 8px", fontSize: 30 }}>Welcome back, LabMate</h2>
            <p style={{ margin: 0, color: "#5f6b7a", maxWidth: 680 }}>
              Review today’s workflow, revisit your favorite tools, and keep your notebook up to date.
            </p>
          </div>
          <div style={{ padding: "12px 16px", borderRadius: 16, background: "#fff", border: "1px solid #dcefe6", minWidth: 180 }}>
            <div style={{ fontSize: 12, color: "#2f6a57", fontWeight: 700, textTransform: "uppercase" }}>Today</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>07 Jul</div>
          </div>
        </div>
      </section>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <Card title="👋 Welcome">
          <p style={{ margin: 0, color: "#5f6b7a" }}>Your lab workspace is ready for planning, calculations, and documentation.</p>
        </Card>

        <Card title="📈 Today's Activity">
          <div style={{ display: "grid", gap: 10 }}>
            {todayActivity.length > 0 ? (
              todayActivity.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", gap: 10, paddingBottom: index < todayActivity.length - 1 ? 8 : 0, borderBottom: index < todayActivity.length - 1 ? "1px solid #eef4ef" : "none" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.title}</div>
                    <div style={{ color: "#5f6b7a", fontSize: 13 }}>{item.detail}</div>
                  </div>
                  <div style={{ color: "#2f6a57", fontWeight: 700 }}>{item.time}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "#5f6b7a" }}>No activity recorded today yet.</div>
            )}
          </div>
        </Card>

        <Card title="⭐ Favorite Calculators">
          <div style={{ display: "grid", gap: 10 }}>
            {favorites.length > 0 ? (
              favorites.map((name) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 12, background: "#f8fcfb" }}>
                  <div style={{ fontSize: 20 }}>{favoriteIcons[name] || favoriteIcons.default}</div>
                  <div style={{ fontWeight: 600 }}>{name}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "#5f6b7a" }}>No favorites yet. Mark a calculator as favorite from the hub.</div>
            )}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <Card title="📒 Recent Lab Notes">
          <div style={{ display: "grid", gap: 10 }}>
            {notes.length > 0 ? (
              notes.slice(0, 3).map((note, index) => (
                <div key={index} style={{ padding: 12, borderRadius: 12, border: "1px solid #e3efe8", background: "#fafdfa" }}>
                  <div style={{ fontWeight: 700 }}>{note.title}</div>
                  <div style={{ color: "#5f6b7a", fontSize: 13, marginTop: 4 }}>{note.notes || note.result || "No details yet."}</div>
                  <div style={{ color: "#2f6a57", fontSize: 12, marginTop: 6 }}>{note.date} {note.time ? `• ${note.time}` : ""}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "#5f6b7a" }}>No lab notes saved yet.</div>
            )}
          </div>
        </Card>

        <Card title="🧮 Recent Calculations">
          <div style={{ display: "grid", gap: 10 }}>
            {calculations.length > 0 ? (
              calculations.slice(0, 3).map((item, index) => (
                <div key={index} style={{ padding: 12, borderRadius: 12, border: "1px solid #e3efe8", background: "#f8fcfb" }}>
                  <div style={{ fontWeight: 700 }}>{item.calculatorName || "Calculation"}</div>
                  <div style={{ color: "#2f6a57", marginTop: 4 }}>{item.result || "Result saved"}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "#5f6b7a" }}>No calculations saved yet.</div>
            )}
          </div>
        </Card>

        <Card title="📅 Today's Schedule">
          <div style={{ color: "#5f6b7a" }}>No scheduled tasks yet. Add a plan from the notebook to keep track of your day.</div>
        </Card>
      </div>

      <Card title="📊 Quick Statistics">
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ padding: 16, borderRadius: 14, border: "1px solid #e3efe8", background: "linear-gradient(135deg, #f8fcfb 0%, #eef8f3 100%)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#2f6a57" }}>{stat.value}</div>
              <div style={{ color: "#5f6b7a", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}