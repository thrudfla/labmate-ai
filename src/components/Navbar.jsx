export default function Navbar({ title }) {
  return (
    <header
      style={{
        borderBottom: "1px solid #eaeaea",
        padding: "16px 20px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <strong>{title}</strong>
      <div style={{ color: "#666", fontSize: 14 }}>LabMate AI Workspace</div>
    </header>
  );
}
