export default function Navbar({ onNewReport }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
         <img 
      src="" 
      alt="User avatar" 
      className="h-full w-full object-cover"/>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Amberix
          </h1>

          <p className="text-sm text-gray-500">
            Carbon Compliance Platform
          </p>
        </div>
      </div>

      
      <button
        onClick={onNewReport}
        className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        + New Compliance Report
      </button>
    </header>
  );
}