import { useEffect, useState } from "react";
export default function FormInputValidationNoStyling() {
  // TODO: create state variables for email, password, hidePassword, emailError, passwordError
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // TODO: use useEffect hook to run functions to validate the input email and password
  // TODO: provide a button to show or hide the password
  // TODO: ensure the button is correctly set up in the the form element
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

    // Check if email and password are not empty
    if (!email) {
      setEmailError("Email is required");
      setEmailTouched(true);
    }
    if (!password) {
      setPasswordError("Password is required");
      setPasswordTouched(true);
    }

    // Only submit if there are no errors and fields are filled
    if (!emailError && !passwordError && email && password) {
      const newEntry = { email, password };
      setSubmittedData([...submittedData, newEntry]);
      alert(
        `Form submitted successfully! Your email ${email} has been submitted.`
      );

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

  console.log(submittedData);

  return (
    <div className="bg-slate-500 min-h-screen">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailTouched(true)} // Set emailTouched to true on focus
            autoComplete="chrome-off"
          />
          {emailError && emailTouched && <p>{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type={hidePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordTouched(true)} // Set passwordTouched to true on focus
            autoComplete="new-password"
          />
          <div className="flex items-center mt-2">
            <button onClick={handleHidePassword}>
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {passwordError && passwordTouched && <p>{passwordError}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((entry, index) => (
            <li key={index}>
              Email: {entry.email}, Password: {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
