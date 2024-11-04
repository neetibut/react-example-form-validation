import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function FormInputValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const validateEmail = () => {
      if (email === "" && emailTouched) {
        setEmailError("Email is required");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailTouched && !emailRegex.test(email)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
        }
      }
    };

    const validatePassword = () => {
      if (password === "" && passwordTouched) {
        setPasswordError("Password is required");
      } else if (passwordTouched && password.length < 6) {
        setPasswordError(
          "Invalid password, must be at least 6 characters long"
        );
      } else {
        setPasswordError("");
      }
    };

    validateEmail();
    validatePassword();
  }, [email, password, emailTouched, passwordTouched]);

  function handleSubmit(e) {
    e.preventDefault();

    // Check for empty fields
    if (!email) {
      setEmailError("Email is required");
      setEmailTouched(true);
    }
    if (!password) {
      setPasswordError("Password is required");
      setPasswordTouched(true);
    }

    // Only submit if there are no errors and both fields are filled
    if (!emailError && !passwordError && email && password) {
      alert(
        `Form submitted successfully! Your email ${email} has been submitted.`
      );
      console.log(email, password);

      // Clear the form after submission
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setEmailTouched(false);
      setPasswordTouched(false);
    } else {
      alert("Please fill in all required fields and fix any errors.");
    }
  }

  function handleHidePassword(e) {
    e.preventDefault();
    setHidePassword(!hidePassword);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-green-500 via-emerald-500 to-teal-500">
      <section className="flex justify-center items-center mb-4">
        <img src={logo} alt="logo" className="w-[50%]" />
      </section>
      <h1 className="mb-4 text-4xl font-extrabold">Registration Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 p-6 rounded shadow-md w-full max-w-sm"
        autoComplete="off"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailTouched(true)} // Set emailTouched to true on focus
            autoComplete="chrome-off"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && emailTouched && (
            <p className="text-red-500 text-xs italic mt-2">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type={hidePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordTouched(true)} // Set passwordTouched to true on focus
            autoComplete="new-password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          <div className="flex items-center mt-2">
            <button
              onClick={handleHidePassword}
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {passwordError && passwordTouched && (
            <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="m-4">Made with ❤️ by JSD8 👩🏻‍💻🧑🏻‍💻 🇹🇭 🌏</p>
    </div>
  );
}
