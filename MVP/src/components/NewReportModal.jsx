import EmissionsForm from "./EmissionsForm";
import ResultsCard from "./ResultsCard";
import PdfUpload from "./PdfUpload";

export default function NewReportModal({
  open,
  onClose,
  result,
  extractedData,
  handleCalculate,
  handleDataExtracted,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              New Compliance Report
            </h2>

            <p className="mt-1 text-gray-500">
              Upload a utility bill or manually enter activity data.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Close
          </button>
        </div>

        
        <div className="space-y-8 p-8">

          <PdfUpload
            onDataExtracted={handleDataExtracted}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <EmissionsForm
              onCalculate={handleCalculate}
              extractedData={extractedData}
            />

            <ResultsCard result={result} />
          </div>

        </div>
      </div>
    </div>
  );
}