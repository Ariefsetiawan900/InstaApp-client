import React from "react";

const Login = () => {
  return (
    <div className="mycard">
      <div className="card  auth-card input-field">
        <h2>InstaApp</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 ">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
