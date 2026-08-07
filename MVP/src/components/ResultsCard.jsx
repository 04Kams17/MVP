import {
  generateScopeReport,
} from "../utils/generateScopeReport";

function ResultsCard({ result }) {
  function formatNumber(number) {
    return Number(number || 0).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  }



  if (!result) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Emissions Results
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Results Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your calculated emissions will appear
            here after you submit the report.
          </p>
        </div>

        <div className="flex min-h-[420px] items-center justify-center px-8">
          <div className="max-w-sm text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
              🌱
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No results yet
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your Scope 1 and Scope 2 activity
              data on the left, then select
              <span className="font-semibold text-slate-700">
                {" "}Calculate Emissions
              </span>
              .
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Emissions Inventory
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Calculation Results
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Estimated Scope 1 and Scope 2 emissions.
            </p>
          </div>

          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Complete
          </div>

        </div>

        

        <div className="mt-6 rounded-2xl bg-emerald-50 p-6">

          <p className="text-sm font-medium text-emerald-700">
            Combined Estimated Emissions
          </p>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">

            <span className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {formatNumber(
                result.combinedTotalKg
              )}
            </span>

            <span className="text-sm font-medium text-slate-500">
              kg CO₂e
            </span>

          </div>

          <p className="mt-2 text-lg font-bold text-emerald-700">
            {formatNumber(
              result.combinedTotalTons
            )}{" "}
            metric tons CO₂e
          </p>

        </div>

      </div>

     

      <div className="grid gap-5 sm:grid-cols-2">

        

        <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-bold text-orange-600">
              1
            </div>

            <div>
              <p className="text-sm font-semibold text-orange-600">
                Scope 1
              </p>

              <p className="text-xs text-slate-500">
                Direct emissions
              </p>
            </div>

          </div>

          <p className="mt-5 text-3xl font-black text-slate-900">
            {formatNumber(
              result.totalScope1Tons
            )}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            metric tons CO₂e
          </p>

        </div>

      

        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
              2
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Scope 2
              </p>

              <p className="text-xs text-slate-500">
                Purchased electricity
              </p>
            </div>

          </div>

          <p className="mt-5 text-3xl font-black text-slate-900">
            {formatNumber(
              result.totalScope2Tons
            )}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            metric tons CO₂e
          </p>

        </div>

      </div>

     

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">
            Inventory Information
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Information associated with this inventory.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">

          <InfoItem
            label="Company"
            value={
              result.companyName ||
              "Not provided"
            }
          />

          <InfoItem
            label="Facility"
            value={
              result.facilityName ||
              "Not provided"
            }
          />

          <InfoItem
            label="Location"
            value={
              result.location ||
              "Not provided"
            }
          />

          <InfoItem
            label="Reporting Year"
            value={result.reportingYear}
          />

          <InfoItem
            label="Organizational Boundary"
            value={result.boundaryMethod}
          />

          <InfoItem
            label="Data Source"
            value={result.dataSource}
          />

        </div>

      </div>

     

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-bold text-orange-600">
            1
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Scope 1 — Direct Emissions
            </h3>

            <p className="text-sm text-slate-500">
              Emissions from direct fuel use.
            </p>
          </div>

        </div>

        <div className="divide-y divide-slate-100">

          <EmissionRow
            name="Natural Gas"
            amount={result.naturalGas}
            unit="therms"
            emissions={
              result.naturalGasEmissions
            }
          />

          <EmissionRow
            name="Gasoline"
            amount={result.gasoline}
            unit="gallons"
            emissions={
              result.gasolineEmissions
            }
          />

          <EmissionRow
            name="Diesel"
            amount={result.diesel}
            unit="gallons"
            emissions={
              result.dieselEmissions
            }
          />

        </div>

      </div>

      

      <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-sm sm:p-7">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
            2
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Scope 2 — Purchased Electricity
            </h3>

            <p className="text-sm text-slate-500">
              Emissions associated with purchased
              electricity.
            </p>
          </div>

        </div>

        <div className="space-y-0">

          <InfoItem
            label="State"
            value={
              result.state ||
              "Not provided"
            }
          />

          <InfoItem
            label="Electricity Used"
            value={`${formatNumber(
              result.electricityUsage
            )} kWh`}
          />

          <InfoItem
            label="Electricity Factor"
            value={`${formatNumber(
              result.electricityFactor
            )} kg CO₂e/kWh`}
          />

          <InfoItem
            label="Scope 2 Emissions"
            value={`${formatNumber(
              result.totalScope2Kg
            )} kg CO₂e`}
            highlight
          />

          <InfoItem
            label="Calculation Method"
            value={
              result.scope2Method ||
              "Location-based"
            }
          />

        </div>

      </div>

      

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

        <h3 className="text-lg font-bold text-slate-900">
          Calculation Details
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Methodology and factor information used
          for this estimate.
        </p>

        <div className="mt-6 space-y-5">

          <DetailItem
            label="Calculation Method"
            value={result.calculationMethod}
          />

          <DetailItem
            label="Scope 1 Factor Source"
            value={result.scope1FactorSource}
          />

          <DetailItem
            label="Scope 2 Factor Source"
            value={result.scope2FactorSource}
          />

          <DetailItem
            label="Calculation Date"
            value={result.calculationDate}
          />

        </div>

      </div>

      

      <button
        type="button"
        onClick={() =>
          generateScopeReport(result)
        }
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
      >
        <span>↓</span>
        Download Emissions PDF Report
      </button>

      

    
      </div>

    
  );
}



function InfoItem({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-0">

      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 font-semibold ${
          highlight
            ? "text-blue-600"
            : "text-slate-900"
        }`}
      >
        {value || "Not provided"}
      </p>

    </div>
  );
}



function EmissionRow({
  name,
  amount,
  unit,
  emissions,
}) {
  function formatNumber(number) {
    return Number(number || 0).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  }

  return (
    <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <p className="font-semibold text-slate-900">
          {name}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {formatNumber(amount)} {unit}
        </p>
      </div>

      <div className="sm:text-right">

        <p className="font-bold text-slate-900">
          {formatNumber(emissions)}
        </p>

        <p className="text-xs text-slate-400">
          kg CO₂e
        </p>

      </div>

    </div>
  );
}



function DetailItem({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default ResultsCard;