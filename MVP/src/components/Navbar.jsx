function Navbar({ onNewReport, onLogout }) {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo / Brand */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            🌱
          </div>

          <div>
            <h1 className="font-bold text-slate-900">
              Emissions Manager
            </h1>

            <p className="text-xs text-slate-500">
              Compliance Dashboard
            </p>
          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={onNewReport}
            className="hidden rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:block"
          >
            + New Report
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Log out
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;