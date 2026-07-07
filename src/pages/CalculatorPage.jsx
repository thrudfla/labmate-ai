import { Link } from "react-router-dom";

export default function CalculatorPage({ title }) {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 760 }}>
      <div style={{ padding: 24, borderRadius: 18, border: "1px solid #dcefe6", background: "linear-gradient(135deg, #f6fffb 0%, #eef7f4 100%)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#2f6a57" }}>
          Calculator workspace
        </div>
        <h2 style={{ margin: "6px 0 8px", fontSize: 28 }}>{title}</h2>
        <p style={{ margin: 0, color: "#5f6b7a" }}>This calculator page is ready for the next implementation step.</p>
      </div>
      <div style={{ padding: 20 }}>
  {title === "Serial Dilution" ? (
    <SerialDilution />
  ) : (
    <>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        Coming Soon
      </div>
      <p style={{ color: "#5f6b7a", margin: 0 }}>
        The {title} experience is being prepared for this release.
      </p>
    </>
  )}
</div>

      <Link to="/calculators" style={{ color: "#2f6a57", fontWeight: 700, textDecoration: "none" }}>
        ← Back to calculator hub
      </Link>
    </div>
  );
}
