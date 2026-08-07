import { useEffect, useState } from "react";

function EmissionsForm({
  onCalculate,
  extractedData,
}) {
  const [companyName, setCompanyName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [location, setLocation] = useState("");
  const [reportingYear, setReportingYear] =
    useState("2026");

  const [naturalGas, setNaturalGas] = useState("");
  const [gasoline, setGasoline] = useState("");
  const [diesel, setDiesel] = useState("");

  const [state, setState] = useState("");
  const [electricityUsage, setElectricityUsage] =
    useState("");

  const [dataSource, setDataSource] =
    useState("Fuel receipt");

  const [boundaryMethod, setBoundaryMethod] =
    useState("Operational control");

 

  useEffect(() => {
    if (!extractedData) {
      return;
    }

    if (extractedData.companyName) {
      setCompanyName(
        extractedData.companyName
      );
    }

    if (extractedData.facilityName) {
      setFacilityName(
        extractedData.facilityName
      );
    }

    if (extractedData.reportingYear) {
      setReportingYear(
        String(
          extractedData.reportingYear
        )
      );
    }

    if (extractedData.naturalGas !== null) {
      setNaturalGas(
        String(
          extractedData.naturalGas
        )
      );
    }

    if (extractedData.gasoline !== null) {
      setGasoline(
        String(
          extractedData.gasoline
        )
      );
    }

    if (extractedData.diesel !== null) {
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

    const naturalGasValue =
      Number(naturalGas) || 0;

    const gasolineValue =
      Number(gasoline) || 0;

    const dieselValue =
      Number(diesel) || 0;

    const electricityValue =
      Number(electricityUsage) || 0;

    if (
      naturalGasValue <= 0 &&
      gasolineValue <= 0 &&
      dieselValue <= 0
    ) {
      alert(
        "Enter at least one fuel amount."
      );

      return;
    }

    onCalculate({
      companyName,
      facilityName,
      location,
      reportingYear:
        Number(reportingYear),

      boundaryMethod,
      dataSource,

      naturalGas:
        naturalGasValue,

      gasoline:
        gasolineValue,

      diesel:
        dieselValue,

      state,

      electricityUsage:
        electricityValue,

      methodology:
        "Activity data multiplied by documented emission factors",

      factorSource:
        "EPA GHG Emission Factors Hub",

      factorYear: 2025,
    });
  }

 

  const inputClass =
    "w-full rounded-xl border border-slate-200 " +
    "bg-white px-4 py-3 text-slate-900 " +
    "outline-none transition " +
    "placeholder:text-slate-400 " +
    "focus:border-emerald-500 " +
    "focus:ring-4 " +
    "focus:ring-emerald-500/10";

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 " +
    "bg-white px-4 py-3 text-slate-900 " +
    "outline-none transition " +
    "focus:border-emerald-500 " +
    "focus:ring-4 " +
    "focus:ring-emerald-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
            🌱
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Emissions Inventory
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Report Information
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Enter your facility information and
              emissions activity data.
            </p>
          </div>

        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="divide-y divide-slate-200"
      >

        

        <section className="px-6 py-7 sm:px-8">

          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Report Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about the organization
              and reporting period.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

           

            <div>
              <label
                htmlFor="companyName"
                className={labelClass}
              >
                Company Name
                <span className="ml-1 text-emerald-600">
                  *
                </span>
              </label>

              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(event) =>
                  setCompanyName(
                    event.target.value
                  )
                }
                placeholder="Example Manufacturing LLC"
                className={inputClass}
              />
            </div>

            

            <div>
              <label
                htmlFor="facilityName"
                className={labelClass}
              >
                Facility Name
                <span className="ml-1 text-emerald-600">
                  *
                </span>
              </label>

              <input
                id="facilityName"
                type="text"
                value={facilityName}
                onChange={(event) =>
                  setFacilityName(
                    event.target.value
                  )
                }
                placeholder="Atlanta Plant"
                className={inputClass}
              />
            </div>

          </div>

          

          <div className="mt-5">
            <label
              htmlFor="location"
              className={labelClass}
            >
              Facility Location
              <span className="ml-1 text-emerald-600">
                *
              </span>
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value
                )
              }
              placeholder="Atlanta, Georgia, United States"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-400">
              Used to identify the facility and
              applicable electricity factor.
            </p>
          </div>

          

          <div className="mt-5 max-w-sm">
            <label
              htmlFor="reportingYear"
              className={labelClass}
            >
              Reporting Year
              <span className="ml-1 text-emerald-600">
                *
              </span>
            </label>

            <select
              id="reportingYear"
              value={reportingYear}
              onChange={(event) =>
                setReportingYear(
                  event.target.value
                )
              }
              className={selectClass}
            >
              <option value="2024">
                2024
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2026">
                2026
              </option>
            </select>
          </div>

        </section>

       

        <section className="px-6 py-7 sm:px-8">

          <div className="mb-6 flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600">
              1
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Scope 1 — Direct Emissions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enter fuel consumed directly by
                your facility or operations.
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

           

            <div className="rounded-xl border border-slate-200 p-4">

              <label
                htmlFor="naturalGas"
                className={labelClass}
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
                    setNaturalGas(
                      event.target.value
                    )
                  }
                  placeholder="0"
                  className={
                    inputClass +
                    " rounded-r-none"
                  }
                />

                <span className="flex items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                  therms
                </span>
              </div>

            </div>

            

            <div className="rounded-xl border border-slate-200 p-4">

              <label
                htmlFor="gasoline"
                className={labelClass}
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
                    setGasoline(
                      event.target.value
                    )
                  }
                  placeholder="0"
                  className={
                    inputClass +
                    " rounded-r-none"
                  }
                />

                <span className="flex items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                  gallons
                </span>
              </div>

            </div>

            

            <div className="rounded-xl border border-slate-200 p-4">

              <label
                htmlFor="diesel"
                className={labelClass}
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
                    setDiesel(
                      event.target.value
                    )
                  }
                  placeholder="0"
                  className={
                    inputClass +
                    " rounded-r-none"
                  }
                />

                <span className="flex items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                  gallons
                </span>
              </div>

            </div>

          </div>

          <div className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-700">
            Enter only the fuels that apply to this
            facility. Leave unused fuel types at zero.
          </div>

        </section>

      

        <section className="px-6 py-7 sm:px-8">

          <div className="mb-6 flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
              2
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Scope 2 — Purchased Electricity
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enter electricity purchased and consumed
                by the facility.
              </p>
            </div>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* State */}

            <div>
              <label
                htmlFor="state"
                className={labelClass}
              >
                U.S. State
              </label>

              <select
                id="state"
                value={state}
                onChange={(event) =>
                  setState(
                    event.target.value
                  )
                }
                className={selectClass}
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

            {/* Electricity */}

            <div>
              <label
                htmlFor="electricityUsage"
                className={labelClass}
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
                  placeholder="0"
                  className={
                    inputClass +
                    " rounded-r-none"
                  }
                />

                <span className="flex items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                  kWh
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Use the electricity consumption
                reported on the utility bill.
              </p>
            </div>

          </div>

        </section>

      

        <section className="px-6 py-7 sm:px-8">

          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Reporting Options
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Choose how this inventory is organized
              and where your activity data came from.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            

            <div>
              <label
                htmlFor="boundaryMethod"
                className={labelClass}
              >
                Organizational Boundary
              </label>

              <select
                id="boundaryMethod"
                value={boundaryMethod}
                onChange={(event) =>
                  setBoundaryMethod(
                    event.target.value
                  )
                }
                className={selectClass}
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

            

            <div>
              <label
                htmlFor="dataSource"
                className={labelClass}
              >
                Activity Data Source
              </label>

              <select
                id="dataSource"
                value={dataSource}
                onChange={(event) =>
                  setDataSource(
                    event.target.value
                  )
                }
                className={selectClass}
              >
                <option>
                  Fuel receipt
                </option>

                <option>
                  Fuel invoice
                </option>

                <option>
                  Meter reading
                </option>

                <option>
                  Utility bill
                </option>

                <option>
                  Estimated data
                </option>
              </select>
            </div>

          </div>

        </section>

      

        <section className="bg-slate-50 px-6 py-6 sm:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="font-semibold text-slate-900">
                Ready to calculate?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your entered activity data will be
                submitted for Scope 1 and Scope 2
                emissions calculation.
              </p>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Calculate Emissions
            </button>

          </div>

        </section>

      </form>
    </div>
  );
}

export default EmissionsForm;