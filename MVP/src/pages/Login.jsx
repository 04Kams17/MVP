import { useState } from "react";
import logo from "../assets/amberix-logo.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = (e) => {
  e.preventDefault();

  console.log({
    email,
    password,
  });

  onLogin();
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">

        
       <div className="flex items-center justify-center gap-3">
  <img
    src={logo}
    alt="Amberix"
    className="h-12 w-12 object-contain"
  />

  <h1 className="text-2xl font-bold text-slate-900">
    Amberix
  </h1>
</div>

        
        <div className="p-10">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">

            <h2 className="text-3xl font-bold text-center mb-2">
              Login
            </h2>

            <p className="text-center text-sm text-gray-500 mb-8">
              Don't have an account?{" "}
              <button className="text-blue-600 hover:underline">
                Create one
              </button>
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-md transition"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-5">
              <button className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}