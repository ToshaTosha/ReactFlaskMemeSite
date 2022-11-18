import React from "react";
//import { Routes, Route } from "react-router-dom";
//import LogInPage from "./pages/LogInPage";
import "./App.css";
import PostsPage from "./pages/PostsPage";



function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  const fetch_auth = function() {
    fetch("http://192.168.0.17:5000/@me")
    .then(response => response.json())
    .then(data => setIsAuth(true))
    .catch(error => setIsAuth(false));
  }

  fetch_auth();

  return (
    <div className="App">
      { isAuth ? <div>OK</div> : <div>NOT OK</div> }
      <PostsPage />
    </div>
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
