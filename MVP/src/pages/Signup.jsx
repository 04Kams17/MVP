import { useState } from "react";
import logo from "../assets/amberix-logo.png";
import Dashboard from "../pages/Dashboard.jsx";

export default function Signup({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      email,
      password,
    });

    
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Top Brand Bar */}
      <header className="border-t-[6px] border-t-[#243923] border-b border-slate-200 bg-white">
        <div className="flex items-center px-5 py-12 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Amberix"
              className="h-16 w-16 object-contain"
            />

            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
              Amberix
            </h1>
          </div>
        </div>
      </header>

    
      <section className="flex min-h-[calc(100vh-165px)] items-start justify-center px-5 pt-44 pb-16">
        <div className="relative w-full max-w-4xl rounded-2xl bg-[#f7f7f7] px-10 py-8 sm:px-12">
          
          <button
            type="button"
            onClick={onBack}
            className="absolute left-7 top-10 flex h-10 w-10 items-center justify-center rounded-full text-4xl font-light leading-none text-slate-700 transition hover:bg-slate-200"
            aria-label="Go back"
          >
            ‹
          </button>

          
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Create an Account
            </h2>

            <p className="mt-3 text-sm font-semibold text-black">
              Have an Account?{" "}
              <button
                type="button"
                onClick={onLogin}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 max-w-3xl"
          >
            <div>
              <label
                htmlFor="signupEmail"
                className="mb-2 block text-lg font-bold text-black"
              >
                Email Address
              </label>

              <input
                id="signupEmail"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                className="h-12 w-full border border-black bg-transparent px-4 text-black outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>

            <div className="mt-7">
              <label
                htmlFor="signupPassword"
                className="mb-2 block text-lg font-bold text-black"
              >
                Create Password
              </label>

              <input
                id="signupPassword"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                className="h-12 w-full border border-black bg-transparent px-4 text-black outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="min-w-[335px] rounded-xl bg-emerald-700 px-10 py-3 text-xl font-bold text-white transition hover:bg-emerald-800 active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}