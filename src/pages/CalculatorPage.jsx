import { Link } from "react-router-dom";
import SerialDilution from "../calculators/SerialDilution";

export default function CalculatorPage({ title }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 20,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          padding: 28,
          borderRadius: 20,
          border: "1px solid #dcefe6",
          background:
            "linear-gradient(135deg,#f7fffb 0%,#eef8f5 100%)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2f6a57",
          }}
        >
          LabMate AI
        </div>

        <h1
          style={{
            marginTop: 8,
            marginBottom: 8,
            fontSize: 32,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#5f6b7a",
            margin: 0,
          }}
        >
          Professional laboratory calculator.
        </p>
      </div>

      <div
        style={{
          padding: 24,
          borderRadius: 20,
          background: "white",
          border: "1px solid #dcefe6",
        }}
      >
        {title === "Serial Dilution" ? (
          <SerialDilution />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: 60,
            }}
          >
            <div
              style={{
                fontSize: 70,
              }}
            >
                🧪
            </div>

            <h2>{title}</h2>

            <p
              style={{
                color: "#5f6b7a",
              }}
            >
              This calculator is currently under development.
            </p>

            <button
              style={{
                marginTop: 20,
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                background: "#2f6a57",
                color: "white",
                cursor: "pointer",
              }}
            >
              Coming Soon
            </button>
          </div>
        )}
      </div>

      <Link
        to="/calculators"
        style={{
          color: "#2f6a57",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        ← Back to Calculator Hub
      </Link>
    </div>
  );
}import SerialDilution from "../calculators/SerialDilution";