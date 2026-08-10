import { useState } from "react";
import logo from "../assets/amberix-logo.png";

export default function Login({
  onLogin,
  onCreateAccount,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  function handleLogin(event) {
    event.preventDefault();

    console.log({
      email,
      password,
    });

    
    onLogin();
  }

  return (
    <main className="min-h-screen bg-white">

     

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

        <div className="w-full max-w-4xl rounded-2xl bg-[#f7f7f7] px-10 py-8 sm:px-12">

          {/* Heading */}

          <div className="text-center">

            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Login
            </h2>

            <p className="mt-3 text-sm font-semibold text-black">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={
                  onCreateAccount
                }
                className="text-blue-500 hover:underline"
              >
                Create an account
              </button>

            </p>

          </div>

          

          <form
            onSubmit={handleLogin}
            className="mx-auto mt-7 max-w-3xl"
          >

           
            <div>

              <label
                htmlFor="loginEmail"
                className="mb-2 block text-lg font-bold text-black"
              >
                Email Address
              </label>

              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
                className="h-12 w-full border border-black bg-transparent px-4 text-black outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />

            </div>

            {/* Password */}

            <div className="mt-7">

              <label
                htmlFor="loginPassword"
                className="mb-2 block text-lg font-bold text-black"
              >
                Password
              </label>

              <input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
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
                Login
              </button>

            </div>

          </form>

          

          <div className="mt-4 text-center">

            <button
              type="button"
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              Forgot your password?
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}