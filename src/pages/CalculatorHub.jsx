import { useEffect, useMemo, useState } from "react";

const categories = [
  "All",
  "Chemistry",
  "Molecular Biology",
  "Cell Biology",
  "Microbiology",
  "QC & Pharma",
  "Statistics",
  "Unit Conversion",
];

const calculators = [
  {
    category: "Chemistry",
    icon: "🧪",
    title: "Dilution Calculator",
    description: "Calculate stock and diluent volumes for routine laboratory dilutions.",
  },
  {
    category: "Chemistry",
    icon: "🧬",
    title: "Serial Dilution",
    description: "Build a rapid dilution series with clear step-by-step volume planning.",
  },
  {
    category: "Chemistry",
    icon: "⚗️",
    title: "Molarity Calculator",
    description: "Convert molarity, moles, and volume for chemistry workflows.",
  },
  {
    category: "Chemistry",
    icon: "🧴",
    title: "Buffer Calculator",
    description: "Estimate the stock volume required for target buffer concentrations.",
  },
  {
    category: "Chemistry",
    icon: "📊",
    title: "Percentage Solution",
    description: "Prepare w/v and v/v solutions with accurate percentage calculations.",
  },
  {
    category: "Molecular Biology",
    icon: "🧫",
    title: "PCR Mix Calculator",
    description: "Plan reaction volumes with master mix and overage adjustments.",
  },
  {
    category: "Molecular Biology",
    icon: "🧬",
    title: "DNA Copy Number",
    description: "Convert DNA mass or concentration to copy number estimates.",
  },
  {
    category: "Molecular Biology",
    icon: "🌡️",
    title: "Primer Tm",
    description: "Estimate primer melting temperature for assay design.",
  },
  {
    category: "Cell Biology",
    icon: "🧠",
    title: "Cell Seeding Calculator",
    description: "Calculate cell counts and seeding densities for culture workflows.",
  },
  {
    category: "Cell Biology",
    icon: "📈",
    title: "Cell Doubling Time",
    description: "Estimate growth rate and doubling time from cell-count data.",
  },
  {
    category: "Microbiology",
    icon: "🔬",
    title: "CFU Calculator",
    description: "Compute colony-forming units from plate counts and dilution factors.",
  },
  {
    category: "Microbiology",
    icon: "🌈",
    title: "OD600 Calculator",
    description: "Estimate biomass and growth from optical density measurements.",
  },
  {
    category: "QC & Pharma",
    icon: "📋",
    title: "Standard Curve",
    description: "Create and interpret standard curves for assay validation.",
  },
  {
    category: "QC & Pharma",
    icon: "📉",
    title: "%CV Calculator",
    description: "Measure precision from replicate measurements quickly.",
  },
  {
    category: "QC & Pharma",
    icon: "✅",
    title: "LOD / LOQ",
    description: "Estimate detection and quantitation limits for analytical methods.",
  },
  {
    category: "Statistics",
    icon: "📐",
    title: "Mean & SD",
    description: "Summarize experimental datasets with core statistical values.",
  },
  {
    category: "Statistics",
    icon: "🎯",
    title: "Confidence Interval",
    description: "Calculate confidence intervals for sample-based estimates.",
  },
  {
    category: "Unit Conversion",
    icon: "⚙️",
    title: "RPM ↔ RCF",
    description: "Switch between rotor speed and relative centrifugal force.",
  },
  {
    category: "Unit Conversion",
    icon: "🧪",
    title: "Volume Converter",
    description: "Convert between mL, µL, L, and related volume units.",
  },
  {
    category: "Unit Conversion",
    icon: "⚖️",
    title: "Weight Converter",
    description: "Convert grams, milligrams, and other weight units instantly.",
  },
];

export default function CalculatorHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("calculator_favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  function toggleFavorite(title) {
    const nextFavorites = favorites.includes(title)
      ? favorites.filter((item) => item !== title)
      : [...favorites, title];

    setFavorites(nextFavorites);
    localStorage.setItem("calculator_favorites", JSON.stringify(nextFavorites));
  }

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return calculators.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        query.length === 0 ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section
        style={{
          background: "linear-gradient(135deg, #eaf7f2 0%, #f6fbff 100%)",
          border: "1px solid #dcefe6",
          borderRadius: 20,
          padding: "24px 24px 20px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#2f6a57" }}>
              Lab workspace
            </div>
            <h2 style={{ margin: "6px 0 8px", fontSize: 28 }}>Calculator Hub</h2>
            <p style={{ margin: 0, color: "#5f6b7a", maxWidth: 620 }}>
              Browse laboratory calculators by discipline, search for a tool, and launch the right workflow in seconds.
            </p>
          </div>
          <div style={{ minWidth: 260, width: "100%", maxWidth: 320 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search calculators"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid #cfe2d7",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                borderRadius: 999,
                border: activeCategory === category ? "1px solid #2f6a57" : "1px solid #d7e7de",
                background: activeCategory === category ? "#2f6a57" : "#fff",
                color: activeCategory === category ? "#fff" : "#2f6a57",
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {selectedTool ? (
        <section
          style={{
            border: "1px solid #e2ece7",
            borderRadius: 18,
            padding: 20,
            background: "#fff",
            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#2f6a57", textTransform: "uppercase", letterSpacing: "0.24em" }}>
                {selectedTool.category}
              </div>
              <h3 style={{ margin: "6px 0 6px", fontSize: 22 }}>{selectedTool.title}</h3>
              <p style={{ margin: 0, color: "#5f6b7a" }}>{selectedTool.description}</p>
            </div>
            <button onClick={() => setSelectedTool(null)} style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #d7e7de", cursor: "pointer" }}>
              Back to hub
            </button>
          </div>
          <div style={{ marginTop: 16, padding: 16, borderRadius: 14, background: "#f8fcfb", color: "#345" }}>
            This calculator workspace is ready for the next implementation step. The hub is now structured for quick access and future calculator integration.
          </div>
        </section>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {filteredTools.map((tool) => (
          <article
            key={tool.title}
            style={{
              display: "grid",
              gap: 12,
              border: "1px solid #e3ece8",
              borderRadius: 18,
              padding: 18,
              background: "#fff",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div style={{ fontSize: 32 }}>{tool.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#2f6a57", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {tool.category}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{tool.title}</div>
            <p style={{ margin: 0, color: "#5f6b7a", lineHeight: 1.5 }}>{tool.description}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              <button
                onClick={() => setSelectedTool(tool)}
                style={{
                  flex: 1,
                  minWidth: 120,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(135deg, #2f6a57 0%, #4b8f7a 100%)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Open Calculator
              </button>
              <button
                onClick={() => toggleFavorite(tool.title)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d7e7de",
                  background: favorites.includes(tool.title) ? "#fef3c7" : "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {favorites.includes(tool.title) ? "★" : "☆"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredTools.length === 0 ? (
        <div style={{ padding: 20, borderRadius: 14, background: "#f8fcfb", color: "#5f6b7a", border: "1px dashed #cfe2d7" }}>
          No calculators match your search yet.
        </div>
      ) : null}
    </div>
  );
}
