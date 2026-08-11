import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("amberix_token")
    );
  });

  const [showSignup, setShowSignup] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [extractedData, setExtractedData] =
    useState(null);

  async function handleCalculate(formData) {
    try {
      const token =
        localStorage.getItem(
          "amberix_token"
        );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/calculate`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(token && {
              Authorization:
                `Bearer ${token}`,
            }),
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

  function handleLoginSuccess(user) {
    console.log(
      "Logged in:",
      user
    );

    setShowSignup(false);
    setLoggedIn(true);
  }

  function handleSignupSuccess(user) {
    console.log(
      "Account created:",
      user
    );

    setShowSignup(false);
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem(
      "amberix_token"
    );

    localStorage.removeItem(
      "amberix_user"
    );

    setLoggedIn(false);
    setShowSignup(false);
    setResult(null);
    setExtractedData(null);
  }

  if (!loggedIn) {
    if (showSignup) {
      return (
        <Signup
          onLogin={() =>
            setShowSignup(false)
          }
          onBack={() =>
            setShowSignup(false)
          }
          onSignupSuccess={
            handleSignupSuccess
          }
        />
      );
    }

    return (
      <Login
        onLogin={
          handleLoginSuccess
        }
        onCreateAccount={() =>
          setShowSignup(true)
        }
      />
    );
  }



  return (
    <Dashboard
      result={result}
      extractedData={
        extractedData
      }
      handleCalculate={
        handleCalculate
      }
      handleDataExtracted={
        handleDataExtracted
      }
      onLogout={
        handleLogout
      }
    />
  );
}

export default App;