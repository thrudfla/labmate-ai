import { useState } from "react";

export default function SaveToNotebookButton({ onSave, disabled, disabledMessage = "Solve the calculation first before saving." }) {
  const [message, setMessage] = useState("");

  function handleClick() {
    if (disabled) {
      setMessage(disabledMessage);
      return;
    }
    onSave();
    setMessage("Saved to Lab Notebook.");
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleClick}
          disabled={disabled}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #c9d8cf",
            background: disabled ? "#f3f5f4" : "#fff",
            color: disabled ? "#9aa5a0" : "#111",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          Save to Lab Notebook
        </button>
      </div>
      {message && <div style={{ color: "#2f6a57", fontWeight: 600 }}>{message}</div>}
    </div>
  );
}