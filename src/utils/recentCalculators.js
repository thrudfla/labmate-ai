export function saveRecentCalculator(name) {
  const key = "recent_calculators";

  const saved = JSON.parse(localStorage.getItem(key) || "[]");

  const updated = [
    name,
    ...saved.filter((item) => item !== name)
  ].slice(0, 5);

  localStorage.setItem(key, JSON.stringify(updated));
}

export function getRecentCalculators() {
  return JSON.parse(
    localStorage.getItem("recent_calculators") || "[]"
  );
}