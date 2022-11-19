import React from "react";
import { Link } from "react-router-dom";
import FormAuto from "../components/FormAuto";

function Register({ fetch_auth }) {
  const handle_response = function (data) {
    if (data.result === "OK") {
      fetch_auth();
    } else {
      alert("Не удлось авторизоваться. Сервер ответил: " + data.result);
    }
  };

  const handle_error = function (error) {
    console.log(error);
    alert("Ошибка сети при авторизации");
  };

  const handlRegister = function (email, password) {
    const data = { email, password };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => handle_response(data))
      .catch((error) => handle_error(error));
  };

  return (
    <div>
      <span>Войдите</span>
      <FormAuto handleClick={handlRegister} />
      <Link className="link-to" to="/register">
        Или Зарегистрируйтесь
      </Link>
    </div>
  );
}

export default Register;
