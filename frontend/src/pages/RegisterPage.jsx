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
    <div className="main-page">
      <div className="left">
        <div className="content">
          <div className="text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <span>Follow your interest.</span>
          </div>
          <div className="text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path
                fill-rule="evenodd"
                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
              />
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            <span>Hear what people are talking about.</span>
          </div>
          <div className="text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-left"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
            <span>Join the conversation.</span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="signin">
          <div className="showcase">
            <img src="" alt="" />
            <h1>Узнайте что происходит в мире прямо сейчас.</h1>
          </div>
          <div className="signup">
            <div className="btn-form">
              <FormAuto title="Зарегистрируйтесь" handleClick={handlRegister} />
            </div>
            <div className="btn-form">
              <Link className="link-to" to="/login">
                или войдите
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <ul>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Status</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
          <li>
            <a href="#">Ads info</a>
          </li>
          <li>
            <a href="#">Brand</a>
          </li>
          <li>
            <a href="#">Apps</a>
          </li>
          <li>
            <a href="#">Advertise</a>
          </li>
          <li>
            <a href="#">Marketing</a>
          </li>
          <li>
            <a href="#">Business</a>
          </li>
          <li>
            <a href="#">Developers</a>
          </li>
          <li>
            <a href="#">Directory</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>&copy; 2022 Twitter</li>
        </ul>
      </div>
    </div>
  );
}

export default Register;
