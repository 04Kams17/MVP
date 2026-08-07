export default function DashboardCards() {
  const cards = [
    {
      title: "Scope 1 Emissions",
      value: "0.00",
      unit: "Metric Tons CO₂e",
      color: "bg-emerald-600",
    },
    {
      title: "Scope 2 Emissions",
      value: "0.00",
      unit: "Metric Tons CO₂e",
      color: "bg-blue-600",
    },
    {
      title: "Compliance Status",
      value: "Ready",
      unit: "MVP",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow"
        >
          <div
            className={`w-12 h-12 rounded-lg ${card.color} mb-4`}
          />

          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="mt-3 text-4xl font-bold text-gray-900">
            {card.value}
          </p>

          <p className="mt-2 text-gray-500">
            {card.unit}
          </p>
        </div>
      ))}
    </div>
  );
}