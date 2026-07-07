export default function CalculatorField({
  label,
  value,
  onChange,
  unit,
  unitOptions,
  onUnitChange,
  type = "number",
  min = "0",
  step = "any",
  placeholder,
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type={type}
          min={min}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #c9d8cf",
          }}
        />
        {unitOptions && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #c9d8cf" }}
          >
            {unitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </label>
  );
}
