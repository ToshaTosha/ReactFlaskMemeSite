import React from "react";

function Form({ handleClick }) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  return (
    <div className="auth-form">
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
      <button className="filled-btn" onClick={() => handleClick(email, pass)}>
        Войдите
      </button>
    </div>
  );
}

export default Form;
