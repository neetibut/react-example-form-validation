export default function FormInputValidationHtmlOnly() {
  return (
    <div>
      <h1>Registration Form</h1>
      <form>
        <div>
          <label>Email:</label>
          <input />
        </div>
        <div>
          <label>Password:</label>
          <input />
          <div>
            <button>Show or Hide Password</button>
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
