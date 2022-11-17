import React from "react";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import "./App.css";
import PostsPage from "./pages/PostsPage";
import { Context } from "./context";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  console.log(isAuth);
  return (
    <Context.Provider value={{ isAuth, setIsAuth }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;

/*
<Routes>
  <Route path="/" element={<PostsPage/>} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
</Routes>
*/
