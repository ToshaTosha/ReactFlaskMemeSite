import React from "react";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import PostsPage from "./pages/PostsPage";
import { Context } from "./context";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  const fetch_auth = function () {
    fetch("/@me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setIsAuth(data.auth))
      .catch((error) =>
        alert(
          "Не удалось обратиться к серверу. Проверьте, запущено ли Flask-приложение."
        )
      );
  };

  React.useEffect(() => {
    fetch_auth();
  }, []);

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
