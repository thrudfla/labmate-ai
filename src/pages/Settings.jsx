import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: "Light",
    language: "English",
    dateFormat: "YYYY-MM-DD",
    autosave: true,
    defaultCalculator: "Dilution Calculator",
  });

  useEffect(() => {
    const saved = localStorage.getItem("labmate_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("labmate_settings", JSON.stringify(settings));
  }, [settings]);

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ margin: 0 }}>⚙️ Settings</h2>

      <Card title="Appearance">
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            Theme
            <select
              value={settings.theme}
              onChange={(e) => updateSetting("theme", e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
              }}
            >
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title="Language">
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            Language
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
              }}
            >
              <option>English</option>
              <option>Korean</option>
              <option>Japanese</option>
              <option>Chinese</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title="Laboratory Preferences">
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            Date Format
            <select
              value={settings.dateFormat}
              onChange={(e) => updateSetting("dateFormat", e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
              }}
            >
              <option>YYYY-MM-DD</option>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </label>

          <label>
            Default Calculator
            <select
              value={settings.defaultCalculator}
              onChange={(e) =>
                updateSetting("defaultCalculator", e.target.value)
              }
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
              }}
            >
              <option>Dilution Calculator</option>
              <option>Buffer Calculator</option>
              <option>Molarity Calculator</option>
              <option>PCR Calculator</option>
            </select>
          </label>

          <label
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={settings.autosave}
              onChange={(e) =>
                updateSetting("autosave", e.target.checked)
              }
            />
            Enable Autosave
          </label>
        </div>
      </Card>

      <Card title="Storage">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Delete all LabMate AI local data?"
              )
            ) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#c62828",
            color: "white",
          }}
        >
          Clear All Local Data
        </button>
      </Card>
    </div>
  );
}