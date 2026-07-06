export function saveCalculatorEntry({ calculatorName, inputs, result }) {
  const now = new Date();
  const entry = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    title: calculatorName,
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 5),
    calculatorUsed: calculatorName,
    notes: formatInputSummary(inputs),
    result: formatResultSummary(result),
  };

  const existingNotebook = JSON.parse(localStorage.getItem("lab_notebook") || "[]");
  const updatedNotebook = [entry, ...existingNotebook];
  localStorage.setItem("lab_notebook", JSON.stringify(updatedNotebook));

  const existingHistory = JSON.parse(localStorage.getItem("calculator_history") || "[]");
  const updatedHistory = [{ ...entry, calculatorName }, ...existingHistory].slice(0, 20);
  localStorage.setItem("calculator_history", JSON.stringify(updatedHistory));

  return entry;
}

function formatInputSummary(inputs) {
  return Object.entries(inputs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function formatResultSummary(result) {
  if (typeof result === "string") {
    return result;
  }

  return Object.entries(result)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}
