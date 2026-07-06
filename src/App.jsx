import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SOP from "./pages/SOP.jsx";
import CalculatorHub from "./pages/CalculatorHub.jsx";
import Translator from "./pages/Translator.jsx";
import Notebook from "./pages/Notebook.jsx";
import Settings from "./pages/Settings.jsx";

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "sop", label: "SOP Generator" },
  { id: "calc", label: "Calculator" },
  { id: "translator", label: "Translator" },
  { id: "notebook", label: "Notebook" },
  { id: "settings", label: "Settings" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("sop_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const renderPage = () => {
    switch (page) {
      case "sop":
        return <SOP history={history} setHistory={setHistory} />;
      case "calc":
        return <CalculatorHub />;
      case "translator":
        return <Translator />;
      case "notebook":
        return <Notebook />;
      case "settings":
        return <Settings />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7fb", fontFamily: "sans-serif" }}>
      <Navbar title="LabMate AI" />
      <div style={{ display: "flex" }}>
        <Sidebar items={navItems} activeItem={page} onSelect={setPage} />
        <main style={{ flex: 1, padding: 24 }}>{renderPage()}</main>
      </div>
    </div>
  );
}
