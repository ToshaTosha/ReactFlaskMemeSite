import React from "react";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import PostsPage from "./pages/PostsPage";
import { Context } from "./context";

function App() {
  const [isAuth, setIsAuth] = React.useState();

  const fetch_auth = function () {
    fetch("http://127.0.0.1:5000/@me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => console.log(data.auth))
      .catch((error) =>
        alert(
          "Не удалось обратиться к серверу. Проверьте, запущено ли Flask-приложение."
        )
      );
  };

  fetch_auth();

  return (
    <div className="App">
      <Context.Provider value={{ isAuth, setIsAuth }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LogInPage fetch_auth={fetch_auth} />}
          />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;

/*
{isAuth ? <div>OK</div> : <LogInPage fetch_auth={fetch_auth} />}
      <PostsPage />
<Routes>
  <Route path="/" element={<PostsPage/>} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
</Routes>
*/
