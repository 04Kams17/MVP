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
    const file = event.target.files[0];

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
    if (
      bytes < 1024
    ) {
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
    <section className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl sm:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
          Document Upload
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Upload an Energy or Emissions PDF
        </h2>

        <p className="mt-2 max-w-2xl leading-7 text-slate-400">
          Upload a utility bill, fuel report,
          energy report, or previous emissions
          document. The system will read the
          PDF and automatically add any
          recognized values to the calculator.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 text-3xl">
          📄
        </div>

        <label
          htmlFor="pdfUpload"
          className="mt-5 inline-flex cursor-pointer rounded-xl bg-sky-500 px-5 py-3 font-bold text-white transition hover:bg-sky-400"
        >
          Choose PDF
        </label>

        <input
          id="pdfUpload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="mt-4 text-sm text-slate-500">
          PDF files only • Maximum size: 10 MB
        </p>
      </div>

      {selectedFile && (
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="break-all font-semibold text-white">
                {selectedFile.name}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {formatFileSize(
                  selectedFile.size
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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
              ? "border-red-400/20 bg-red-500/5 text-red-300"
              : "border-emerald-400/20 bg-emerald-500/5 text-emerald-300"
          }`}
        >
          {uploadMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={
          uploading ||
          !selectedFile
        }
        className="mt-5 w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "Uploading and Reading PDF..."
          : "Upload and Read PDF"}
      </button>
    </section>
  );
}

export default PdfUpload;