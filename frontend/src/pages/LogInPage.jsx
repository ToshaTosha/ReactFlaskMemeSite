import React from "react";
import { Context } from "../context";
import Auth from "../Auth";
import FormAuto from "../components/FormAuto";
import { useNavigate } from "react-router";

function Register() {
  const { isAuth, setIsAuth } = React.useContext(Context);
  console.log(isAuth);
  let navigate = useNavigate();
  const handlRegister = async (email, password) => {
    //console.log(email, password);
    try {
      const resp = await Auth.post("http://192.168.0.17:5000/login", {
        email,
        password,
      });

      setIsAuth(true);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        alert("!!");
      }
    }
  };

  return <FormAuto title="Зарегистрироваться" handleClick={handlRegister} />;
}

export default Register;
