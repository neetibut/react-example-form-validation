import { useEffect, useState } from "react";
import logo from "../assets/logo_JSD7_NJMKL.png";

export default function FormInputValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const validateEmail = () => {
      if (email === "") {
        setEmailError("");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    };
    const validatePassword = () => {
      if (password === "") {
        setPasswordError("");
      } else if (password.length < 6) {
        setPasswordError(
          "Invalid password, must be at least 6 characters long"
        );
      } else {
        setPasswordError("");
      }
    };
    validateEmail();
    validatePassword();
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!emailError && !passwordError) {
      alert(
        `Form submitted successfully! Your email ${email} has been submitted.`
      );
      console.log(email, password);
    } else if (emailError && passwordError) {
      alert("Please fix the email address and password errors in the form.");
    } else if (emailError) {
      alert("Please fix the email address error in the form.");
    } else if (passwordError) {
      alert("Please fix the password error in the form.");
    } else {
      console.log("Unknown error, please refresh your browser");
    }
  }

  function handleHidePassword(e) {
    e.preventDefault();
    setHidePassword(!hidePassword);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-green-500 via-emerald-500 to-teal-500">
      <section className="flex justify-center items-center mb-4">
        <img src={logo} alt="logo" className="w-[30%]" />
      </section>
      <h1 className="mb-4 text-4xl font-extrabold">Registration Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 p-6 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && email !== "" && (
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          <div className="flex items-center mt-2">
            <button
              onClick={handleHidePassword}
              className={`text-sm text-blue-500 hover:underline focus:outline-none ${
                hidePassword ? "" : "hover:bg-emerald-500"
              }`}
            >
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {passwordError && password !== "" && (
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
      <p className="m-4 ">Made with ❤️ by JSD7 👩🏻‍💻🧑🏻‍💻 🇹🇭 🌏</p>
    </div>
  );
}
