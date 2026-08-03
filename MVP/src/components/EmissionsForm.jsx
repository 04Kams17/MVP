import {
  useEffect,
  useState,
} from "react";

function EmissionsForm({
  onCalculate,
  extractedData,
}) {
  const [companyName, setCompanyName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [location, setLocation] = useState("");
  const [reportingYear, setReportingYear] = useState("2026");

  const [naturalGas, setNaturalGas] = useState("");
  const [gasoline, setGasoline] = useState("");
  const [diesel, setDiesel] = useState("");
  const [state, setState] = useState("");
  const [electricityUsage, setElectricityUsage] =
  useState("");

  const [dataSource, setDataSource] = useState("Fuel receipt");
  const [boundaryMethod, setBoundaryMethod] =
    useState("Operational control");
    useEffect(() => {
  if (!extractedData) {
    return;
  }

  if (
    extractedData.companyName
  ) {
    setCompanyName(
      extractedData.companyName
    );
  }

  if (
    extractedData.facilityName
  ) {
    setFacilityName(
      extractedData.facilityName
    );
  }

  if (
    extractedData.reportingYear
  ) {
    setReportingYear(
      String(
        extractedData.reportingYear
      )
    );
  }

  if (
    extractedData.naturalGas !== null
  ) {
    setNaturalGas(
      String(
        extractedData.naturalGas
      )
    );
  }

  if (
    extractedData.gasoline !== null
  ) {
    setGasoline(
      String(
        extractedData.gasoline
      )
    );
  }

  if (
    extractedData.diesel !== null
  ) {
    setDiesel(
      String(
        extractedData.diesel
      )
    );
  }

  if (
    extractedData.electricityUsage !==
    null
  ) {
    setElectricityUsage(
      String(
        extractedData.electricityUsage
      )
    );
  }
}, [extractedData]);

  function handleSubmit(event) {
    event.preventDefault();

    const naturalGasValue = Number(naturalGas) || 0;
    const gasolineValue = Number(gasoline) || 0;
    const dieselValue = Number(diesel) || 0;
    const electricityValue =
      Number(electricityUsage) || 0;

    if (
      naturalGasValue <= 0 &&
      gasolineValue <= 0 &&
      dieselValue <= 0
    ) {
      alert("Enter at least one fuel amount.");
      return;
    }

    onCalculate({
      companyName,
      facilityName,
      location,
      reportingYear: Number(reportingYear),

      boundaryMethod,
      dataSource,

      naturalGas: naturalGasValue,
      gasoline: gasolineValue,
      diesel: dieselValue,
      state,
      electricityUsage: electricityValue,

      methodology:
        "Activity data multiplied by documented emission factors",

      factorSource:
        "EPA GHG Emission Factors Hub",

      factorYear: 2025,
    });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-700 " +
    "bg-slate-800 px-4 py-3 text-white " +
    "outline-none transition " +
    "placeholder:text-slate-500 " +
    "focus:border-emerald-400 " +
    "focus:ring-2 " +
    "focus:ring-emerald-400/20";

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Scope 1 Inventory
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Enter Direct Emissions Data
        </h2>

        <p className="mt-2 text-slate-400">
          Record fuel activity data and reporting information
          for your Scope 1 inventory.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="companyName"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Company Name
            </label>

            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(event) =>
                setCompanyName(event.target.value)
              }
              placeholder="Example Manufacturing LLC"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="facilityName"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Facility Name
            </label>

            <input
              id="facilityName"
              type="text"
              value={facilityName}
              onChange={(event) =>
                setFacilityName(event.target.value)
              }
              placeholder="Atlanta Plant"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Facility Location
          </label>

          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            placeholder="Atlanta, Georgia, United States"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="reportingYear"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Reporting Year
            </label>

            <select
              id="reportingYear"
              value={reportingYear}
              onChange={(event) =>
                setReportingYear(event.target.value)
              }
              className={inputClass}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="boundaryMethod"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Organizational Boundary
            </label>

            <select
              id="boundaryMethod"
              value={boundaryMethod}
              onChange={(event) =>
                setBoundaryMethod(event.target.value)
              }
              className={inputClass}
            >
              <option>
                Operational control
              </option>

              <option>
                Financial control
              </option>

              <option>
                Equity share
              </option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="dataSource"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Activity Data Source
          </label>

          <select
            id="dataSource"
            value={dataSource}
            onChange={(event) =>
              setDataSource(event.target.value)
            }
            className={inputClass}
          >
            <option>Fuel receipt</option>
            <option>Fuel invoice</option>
            <option>Meter reading</option>
            <option>Utility bill</option>
            <option>Estimated data</option>
          </select>
        </div>

        <div className="border-t border-slate-700 pt-5">
          <h3 className="text-lg font-bold text-white">
            Fuel Activity Data
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Enter zero or leave blank for fuel sources
            that do not apply.
          </p>
        </div>

        <div>
          <label
            htmlFor="naturalGas"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Natural Gas
          </label>

          <div className="flex">
            <input
              id="naturalGas"
              type="number"
              min="0"
              step="0.01"
              value={naturalGas}
              onChange={(event) =>
                setNaturalGas(event.target.value)
              }
              placeholder="1000"
              className={
                inputClass +
                " rounded-r-none"
              }
            />

            <span className="flex items-center rounded-r-xl border border-l-0 border-slate-700 bg-slate-700 px-4 text-sm text-slate-300">
              therms
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="gasoline"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Gasoline
          </label>

          <div className="flex">
            <input
              id="gasoline"
              type="number"
              min="0"
              step="0.01"
              value={gasoline}
              onChange={(event) =>
                setGasoline(event.target.value)
              }
              placeholder="500"
              className={
                inputClass +
                " rounded-r-none"
              }
            />

            <span className="flex items-center rounded-r-xl border border-l-0 border-slate-700 bg-slate-700 px-4 text-sm text-slate-300">
              gallons
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="diesel"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Diesel
          </label>

          <div className="flex">
            <input
              id="diesel"
              type="number"
              min="0"
              step="0.01"
              value={diesel}
              onChange={(event) =>
                setDiesel(event.target.value)
              }
              placeholder="500"
              className={
                inputClass +
                " rounded-r-none"
              }
            />

            <span className="flex items-center rounded-r-xl border border-l-0 border-slate-700 bg-slate-700 px-4 text-sm text-slate-300">
              gallons
            </span>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6">
  <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
    Scope 2 Emissions
  </p>

  <h3 className="mt-2 text-lg font-bold text-white">
    Purchased Electricity
  </h3>

  <p className="mt-1 text-sm text-slate-400">
    Enter electricity purchased and consumed by
    the facility.
  </p>
</div>

<div>
  <label
    htmlFor="state"
    className="mb-2 block text-sm font-medium text-slate-200"
  >
    U.S. State
  </label>

  <select
    id="state"
    value={state}
    onChange={(event) =>
      setState(event.target.value)
    }
    className={inputClass}
  >
    <option value="">
      Select a state
    </option>

    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
  </select>
</div>

<div>
  <label
    htmlFor="electricityUsage"
    className="mb-2 block text-sm font-medium text-slate-200"
  >
    Purchased Electricity
  </label>

  <div className="flex">
    <input
      id="electricityUsage"
      type="number"
      min="0"
      step="0.01"
      value={electricityUsage}
      onChange={(event) =>
        setElectricityUsage(
          event.target.value
        )
      }
      placeholder="50000"
      className={
        inputClass +
        " rounded-r-none"
      }
    />

    <span className="flex items-center rounded-r-xl border border-l-0 border-slate-700 bg-slate-700 px-4 text-sm text-slate-300">
      kWh
    </span>
  </div>

  <p className="mt-2 text-xs text-slate-500">
    Use the electricity consumption shown on
    the facility's utility bill.
  </p>
</div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98]"
        >
          Calculate Scope 1 + Scope 2 Emissions
        </button>
      </form>
    </div>
  );
}

export default EmissionsForm;