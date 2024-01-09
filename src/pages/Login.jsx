import React from "react";
import LogInForm from "../components/LogInForm";
import dashboard from '../../public/dashboard.png'
const Login = () => {
  return (
    <div className="overflow-hidden h-full">
      <img src={dashboard} alt="" className="h-full object-cover absolute"/>
      <LogInForm />
    </div>
  );
};

export default Login;
        