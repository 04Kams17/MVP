const cards = [
  {
    title: "Scope 1 Emissions",
    value: "0.00",
    unit: "Natural Gas and Fleet Diesel",
  },
  {
    title: "Scope 2 Emissions",
    value: "0.00",
    unit: "EPA eGrid (CAMX region)",
  },
  {
    title: "Compliance Status",
    value: "Ready",
    unit: "GHG Protocol Corporate Standard",
  },
];

export default function DashboardCards() {
  return (
    <div className=" mb-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3">

      {cards.map((card) => (
        <div
          key={card.title}
          className="min-w-0 rounded-xl border border-gray-200 bg-white p-6"
        >
          <p className="text-sm font-medium text-gray-500">
            {card.title}
          </p>

          <div className="mt-3">
            <p className="text-3xl font-bold text-gray-900">
              {card.value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {card.unit}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}