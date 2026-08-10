import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [showSignup, setShowSignup] =
    useState(false);

  const [result, setResult] = useState(null);

  const [extractedData, setExtractedData] =
    useState(null);

  async function handleCalculate(formData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/calculate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
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



  if (!loggedIn) {
    // Create Account Page
    if (showSignup) {
      return (
        <Signup
          onLogin={() =>
            setShowSignup(false)
          }
          onBack={() =>
            setShowSignup(false)
          }
        />
      );
    }

    // Login Page
    return (
      <Login
        onLogin={() =>
          setLoggedIn(true)
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
      extractedData={extractedData}
      handleCalculate={
        handleCalculate
      }
      handleDataExtracted={
        handleDataExtracted
      }
      onLogout={() => {
        setLoggedIn(false);
        setShowSignup(false);
      }}
    />
  );
}

export default App;