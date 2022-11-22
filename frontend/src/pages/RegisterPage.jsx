import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { Navigate } from "react-router-dom";
import FormAuto from "../components/FormAuto";

function Register() {
  const { isAuth, setIsAuth } = React.useContext(Context);
  const handle_response = function (data) {
    if (data.result === "OK") {
      setIsAuth(true);
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
    fetch("/register", {
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

  return isAuth ? (
    <Navigate replace to="/" />
  ) : (
    <div>
      <span>Зарегистрируйтесь</span>
      <FormAuto handleClick={handlRegister} />
      <Link className="link-to" to="/login">
        или войдите
      </Link>
    </div>
  );
}

export default Register;
