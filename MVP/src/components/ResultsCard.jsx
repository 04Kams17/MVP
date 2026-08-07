import {
  generateScopeReport,
} from "../utils/generateScopeReport";

function ResultsCard({ result }) {
  
  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 shadow-2xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Emissions Results
        </p>

        <div className="flex min-h-80 items-center justify-center">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl">
              🌱
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Your results will appear here
            </h2>

            <p className="mt-3 text-slate-400">
              Enter your fuel and electricity data, then
              calculate your Scope 1 and Scope 2 emissions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function formatNumber(number) {
    return Number(number || 0).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/15 to-slate-900 p-6 shadow-2xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Scope 1 + Scope 2 Results
      </p>

      
      <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
        <p className="text-sm text-slate-300">
          Combined Estimated Emissions
        </p>

        <p className="mt-3 text-4xl font-bold text-emerald-400 sm:text-5xl">
          {formatNumber(result.combinedTotalKg)}
        </p>

        <p className="mt-2 text-slate-300">
          kilograms CO₂e
        </p>

        <p className="mt-4 text-lg font-semibold text-white">
          {formatNumber(result.combinedTotalTons)}
          {" "}
          metric tons CO₂e
        </p>
      </div>

      
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm font-semibold text-emerald-400">
            Scope 1
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {formatNumber(result.totalScope1Tons)}
          </p>

          <p className="text-sm text-slate-400">
            metric tons CO₂e
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Direct emissions from fuel use
          </p>
        </div>

        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
          <p className="text-sm font-semibold text-sky-400">
            Scope 2
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {formatNumber(result.totalScope2Tons)}
          </p>

          <p className="text-sm text-slate-400">
            metric tons CO₂e
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Purchased electricity emissions
          </p>
        </div>
      </div>

    
      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
          Inventory Information
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Company
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.companyName || "Not provided"}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Facility
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.facilityName || "Not provided"}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Location
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.location || "Not provided"}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Reporting year
            </span>

            <span className="font-semibold text-white">
              {result.reportingYear}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Organizational boundary
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.boundaryMethod}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Data source
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.dataSource}
            </span>
          </div>
        </div>
      </div>

      
      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-400">
          Scope 1 — Direct Emissions
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between gap-5">
            <div>
              <p className="font-medium text-white">
                Natural Gas
              </p>

              <p className="text-xs text-slate-500">
                {formatNumber(result.naturalGas)}
                {" "}
                therms
              </p>
            </div>

            <p className="text-right font-semibold text-white">
              {formatNumber(
                result.naturalGasEmissions
              )}

              <span className="block text-xs font-normal text-slate-500">
                kg CO₂e
              </span>
            </p>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <div>
              <p className="font-medium text-white">
                Gasoline
              </p>

              <p className="text-xs text-slate-500">
                {formatNumber(result.gasoline)}
                {" "}
                gallons
              </p>
            </div>

            <p className="text-right font-semibold text-white">
              {formatNumber(
                result.gasolineEmissions
              )}

              <span className="block text-xs font-normal text-slate-500">
                kg CO₂e
              </span>
            </p>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <div>
              <p className="font-medium text-white">
                Diesel
              </p>

              <p className="text-xs text-slate-500">
                {formatNumber(result.diesel)}
                {" "}
                gallons
              </p>
            </div>

            <p className="text-right font-semibold text-white">
              {formatNumber(
                result.dieselEmissions
              )}

              <span className="block text-xs font-normal text-slate-500">
                kg CO₂e
              </span>
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-400">
          Scope 2 — Purchased Electricity
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              State
            </span>

            <span className="font-semibold text-white">
              {result.state || "Not provided"}
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Electricity used
            </span>

            <span className="font-semibold text-white">
              {formatNumber(
                result.electricityUsage
              )}
              {" "}
              kWh
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Electricity factor
            </span>

            <span className="font-semibold text-white">
              {formatNumber(
                result.electricityFactor
              )}
              {" "}
              kg CO₂e/kWh
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Scope 2 emissions
            </span>

            <span className="font-bold text-sky-400">
              {formatNumber(
                result.totalScope2Kg
              )}
              {" "}
              kg CO₂e
            </span>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-400">
              Method
            </span>

            <span className="max-w-[60%] text-right font-semibold text-white">
              {result.scope2Method}
            </span>
          </div>
        </div>
      </div>

      
      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
          Calculation Details
        </h3>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-slate-500">
              Calculation method
            </p>

            <p className="mt-1 font-medium text-white">
              {result.calculationMethod}
            </p>
          </div>

          <div className="border-t border-slate-700" />

          <div>
            <p className="text-slate-500">
              Scope 1 factor source
            </p>

            <p className="mt-1 font-medium text-white">
              {result.scope1FactorSource}
            </p>
          </div>

          <div className="border-t border-slate-700" />

          <div>
            <p className="text-slate-500">
              Scope 2 factor source
            </p>

            <p className="mt-1 font-medium text-white">
              {result.scope2FactorSource}
            </p>
          </div>

          <div className="border-t border-slate-700" />

          <div className="flex justify-between gap-5">
            <span className="text-slate-500">
              Calculation date
            </span>

            <span className="max-w-[60%] text-right font-medium text-white">
              {result.calculationDate}
            </span>
          </div>
        </div>
      </div>

      
      <button
        type="button"
        onClick={() =>
          generateScopeReport(result)
        }
        className="mt-5 w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98]"
      >
        Download Emissions PDF Report
      </button>

      
      <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm font-semibold text-amber-300">
          Inventory Status
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {result.inventoryStatus}
        </p>
      </div>
    </div>
  );
}

export default ResultsCard;