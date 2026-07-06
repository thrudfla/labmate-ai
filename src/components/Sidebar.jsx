export default function Sidebar({ items, activeItem, onSelect }) {
  return (
    <aside
      style={{
        width: 220,
        borderRight: "1px solid #eaeaea",
        padding: "20px 16px",
        background: "#fafafa",
        minHeight: "70vh",
      }}
    >
      <h3 style={{ marginTop: 0 }}>LabMate AI</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              border: activeItem === item.id ? "1px solid #4f46e5" : "1px solid #e5e5e5",
              borderRadius: 8,
              background: activeItem === item.id ? "#eef2ff" : "#fff",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
