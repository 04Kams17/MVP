import { useState } from "react";
import ReportsTable from "../components/ReportsTable";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";

import NewReportModal from "../components/NewReportModal";

export default function Dashboard({
  result,
  extractedData,
  handleCalculate,
  handleDataExtracted,
}) {
  const [showModal, setShowModal] =
    useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar
        onNewReport={() =>
          setShowModal(true)
        }
      />

      <div className="mx-auto max-w-7xl p-8">

        <DashboardCards />

       <ReportsTable />

      </div>

      

     <NewReportModal
  open={showModal}
  onClose={() => setShowModal(false)}
  result={result}
  extractedData={extractedData}
  handleCalculate={handleCalculate}
  handleDataExtracted={handleDataExtracted}
/>
    </main>
  );
}