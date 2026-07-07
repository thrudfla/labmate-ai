export default function ResultPanel({ title = "Result", error, warning, formula, rows }) {
  return (
    <div style={{ padding: 16, borderRadius: 14, background: "#f7fcf9", border: "1px solid #e3efe8" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#2f6a57",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        }}
      >
        {title}
      </div>

      {error ? (
        <div style={{ marginTop: 8, color: "#a33" }}>{error}</div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {rows.map((row) => (
              <div key={row.label}>
                <strong>{row.label}:</strong> {row.value}
              </div>
            ))}
          </div>

          {warning && (
            <div
              style={{
                marginTop: 10,
                padding: "8px 10px",
                borderRadius: 8,
                background: "#fef3c7",
                color: "#8a6d1f",
                fontSize: 13,
              }}
            >
              ⚠ {warning}
            </div>
          )}

          {formula && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#5f6b7a", fontFamily: "monospace" }}>
              {formula}
            </div>
          )}
        </>
      )}
    </div>
  );
}