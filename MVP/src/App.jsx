import { useState } from "react";

import EmissionsForm from "./components/EmissionsForm";
import ResultsCard from "./components/ResultsCard";
import PdfUpload from "./components/PdfUpload";

function App() {
  const [result, setResult] =
    useState(null);

  const [extractedData, setExtractedData] =
    useState(null);

  async function handleCalculate(
    formData
  ) {
    try {
     const response =
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/calculate`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Calculation failed."
        );
      }

      setResult(data);
    } catch (error) {
      console.error(
        "Calculation error:",
        error
      );

      alert(
        error.message ||
          "The emissions calculation could not be completed."
      );
    }
  }

  function handleDataExtracted(
    extractedFields
  ) {
    setExtractedData(
      extractedFields
    );

    console.log(
      "Data sent to calculator:",
      extractedFields
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Emissions Inventory 
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Scope 1 + Scope 2
            <span className="block text-emerald-400">
              Emissions Calculator
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Enter operational data or upload a
            utility, fuel, or emissions PDF to
            estimate greenhouse gas emissions.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <EmissionsForm
            onCalculate={
              handleCalculate
            }
            extractedData={
              extractedData
            }
          />

          <ResultsCard
            result={result}
          />
        </section>

        <PdfUpload
          onDataExtracted={
            handleDataExtracted
          }
        />
      </div>
    </main>
  );
}

export default App;