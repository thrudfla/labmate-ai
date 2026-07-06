import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";

const emptyForm = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  calculatorUsed: "",
  notes: "",
  result: "",
};

export default function Notebook() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lab_notebook");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  function persistEntries(nextEntries) {
    setNotes(nextEntries);
    localStorage.setItem("lab_notebook", JSON.stringify(nextEntries));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.notes.trim()) {
      return;
    }

    const entry = {
      ...form,
      id: editingId ?? `${Date.now()}`,
      title: form.title.trim(),
      calculatorUsed: form.calculatorUsed.trim(),
      notes: form.notes.trim(),
      result: form.result.trim(),
    };

    const nextEntries = editingId
      ? notes.map((note) => (note.id === editingId ? entry : note))
      : [entry, ...notes];

    persistEntries(nextEntries);
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(note) {
    setEditingId(note.id);
    setForm({
      title: note.title,
      date: note.date,
      calculatorUsed: note.calculatorUsed,
      notes: note.notes,
      result: note.result,
    });
  }

  function deleteEntry(id) {
    const nextEntries = notes.filter((note) => note.id !== id);
    persistEntries(nextEntries);
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  const todayEntries = notes.filter((note) => note.date === new Date().toISOString().slice(0, 10));

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Card title="Today">
        <div style={{ display: "grid", gap: 10 }}>
          {todayEntries.length === 0 ? (
            <div style={{ color: "#5f6b7a" }}>No activity recorded today yet.</div>
          ) : (
            todayEntries.map((note) => (
              <div key={note.id} style={{ padding: 12, borderRadius: 12, border: "1px solid #e3efe8", background: "#f8fcfb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{note.title}</div>
                    <div style={{ color: "#5f6b7a", fontSize: 13 }}>{note.calculatorUsed || "Manual entry"}</div>
                  </div>
                  <div style={{ color: "#2f6a57", fontWeight: 700 }}>{note.time || ""}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card title="Add Experiment">
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
          <input
            value={form.calculatorUsed}
            onChange={(e) => setForm({ ...form, calculatorUsed: e.target.value })}
            placeholder="Calculator Used"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
            rows={4}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
          <textarea
            value={form.result}
            onChange={(e) => setForm({ ...form, result: e.target.value })}
            placeholder="Result"
            rows={3}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="submit" style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#2f6a57", color: "#fff", cursor: "pointer" }}>
              {editingId ? "Update Experiment" : "Add Experiment"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card title="Saved Experiments">
        {notes.length === 0 ? <p>No saved experiments yet.</p> : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          {notes.map((note) => (
            <div key={note.id} style={{ padding: 14, borderRadius: 14, border: "1px solid #e3efe8", background: "#fafdfa", display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 700 }}>{note.title}</div>
              <div style={{ color: "#5f6b7a", fontSize: 13 }}>{note.date}</div>
              <div style={{ color: "#2f6a57", fontWeight: 600 }}>{note.calculatorUsed || "No calculator specified"}</div>
              <div style={{ color: "#5f6b7a", whiteSpace: "pre-wrap" }}>{note.notes}</div>
              <div style={{ color: "#345", whiteSpace: "pre-wrap", fontWeight: 600 }}>{note.result}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => startEdit(note)} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}>
                  Edit
                </button>
                <button onClick={() => deleteEntry(note.id)} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #c9d8cf", background: "#fff", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
