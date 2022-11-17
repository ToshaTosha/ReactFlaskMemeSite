import React from "react";

function Form({ handleClick }) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  return (
    <div className="block">
      <input
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className="input"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button className="button" onClick={() => handleClick(email, pass)}>
        click here
      </button>
    </div>
  );
}

export default Form;
