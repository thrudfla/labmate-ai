export default function CalculatorCard({ children, style }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: 20,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
