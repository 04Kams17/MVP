export default function ReportsTable() {
  const reports = [
    {
      year: "2026",
      facility: "Atlanta Plant",
      status: "Complete",
      type: "Scope 1 + Scope 2",
    },
    {
      year: "2025",
      facility: "Houston Facility",
      status: "Pending",
      type: "Scope 1",
    },
  ];

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Reports
          </h2>

          <p className="text-gray-500">
            Your latest emissions reports
          </p>
        </div>

        <button className="rounded-lg border px-4 py-2 hover:bg-gray-50">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-4">Reporting Year</th>
            <th className="pb-4">Facility</th>
            <th className="pb-4">Report Type</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Download</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report, index) => (
            <tr
              key={index}
              className="border-b last:border-0"
            >
              <td className="py-5">{report.year}</td>

              <td>{report.facility}</td>

              <td>{report.type}</td>

              <td>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    report.status === "Complete"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {report.status}
                </span>
              </td>

              <td>
                <button className="text-emerald-600 hover:underline">
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}