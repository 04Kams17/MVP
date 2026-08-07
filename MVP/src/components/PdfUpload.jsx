import { useState } from "react";

function PdfUpload({ onDataExtracted }) {
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [isError, setIsError] =
    useState(false);

  function handleFileChange(event) {
    const file =
      event.target.files[0];

    setUploadMessage("");
    setIsError(false);

    if (!file) {
      return;
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      setSelectedFile(null);
      setIsError(true);

      setUploadMessage(
        "Please select a valid PDF file."
      );

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setSelectedFile(null);
      setIsError(true);

      setUploadMessage(
        "The PDF must be smaller than 10 MB."
      );

      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setIsError(true);

      setUploadMessage(
        "Choose a PDF before uploading."
      );

      return;
    }

    try {
      setUploading(true);
      setIsError(false);

      setUploadMessage(
        "Uploading and reading the PDF..."
      );

      const formData =
        new FormData();

      formData.append(
        "pdf",
        selectedFile
      );

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/upload-pdf`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "The PDF upload failed."
        );
      }

      console.log(
        "PDF extraction result:",
        data
      );

      if (
        onDataExtracted
      ) {
        onDataExtracted(
          data.extractedFields
        );
      }

      setIsError(false);

      setUploadMessage(
        "PDF read successfully. Any values found were added to the calculator."
      );
    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      setIsError(true);

      setUploadMessage(
        error.message ||
          "The PDF could not be uploaded."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setSelectedFile(null);
    setUploadMessage("");
    setIsError(false);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} bytes`;
    }

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

     

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
          📄
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Supporting Documents
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Upload an Energy or Emissions PDF
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Upload a utility bill, fuel report,
            energy report, or previous emissions
            document. We'll read the document and
            automatically add recognized values to
            your calculator.
          </p>
        </div>

      </div>

     

      <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center transition hover:border-emerald-300 hover:bg-emerald-50/30">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          📄
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          Upload your document
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Choose a PDF containing utility,
          fuel, energy, or emissions information.
        </p>

        <label
          htmlFor="pdfUpload"
          className="mt-5 inline-flex cursor-pointer items-center rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
        >
          Choose PDF
        </label>

        <input
          id="pdfUpload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={
            handleFileChange
          }
          className="hidden"
        />

        <p className="mt-4 text-xs text-slate-400">
          PDF files only • Maximum size:
          10 MB
        </p>

      </div>

      

      {selectedFile && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                📄
              </div>

              <div className="min-w-0">

                <p className="break-all font-semibold text-slate-900">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {formatFileSize(
                    selectedFile.size
                  )}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={
                handleRemove
              }
              disabled={uploading}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove
            </button>

          </div>

        </div>
      )}

      

      {uploadMessage && (
        <div
          className={`mt-5 rounded-xl border p-4 text-sm ${
            isError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          <div className="flex items-start gap-2">

            <span>
              {isError
                ? "⚠️"
                : "✓"}
            </span>

            <span>
              {uploadMessage}
            </span>

          </div>
        </div>
      )}

      

      <button
        type="button"
        onClick={handleUpload}
        disabled={
          uploading ||
          !selectedFile
        }
        className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {uploading
          ? "Uploading and Reading PDF..."
          : "Upload and Read PDF"}
      </button>

   

      <div className="mt-5 flex gap-3 rounded-xl bg-slate-50 p-4">

        <div className="text-lg">
          💡
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700">
            Automatic data extraction
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            After the document is processed,
            recognized information will
            automatically appear in the
            calculation fields. You can review
            and edit the values before calculating.
          </p>
        </div>

      </div>

    </section>
  );
}

export default PdfUpload;