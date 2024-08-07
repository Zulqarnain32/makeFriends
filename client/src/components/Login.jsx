import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .post("http://localhost:5000/auth/login", { email, password })
      .post("https://make-friends-seven.vercel.app/auth/login", { email, password })
      .then((result) => {
        if (result.data.message === "logined") {
          console.log(result.data.role + " you are");
          window.localStorage.setItem("id", result.data.id);
<<<<<<< HEAD
            // navigate("/secret");
=======
>>>>>>> 79200398350eb5771cb7c9db362dcae371254eeb
            navigate("/");
          window.location.reload();
        } else if (result.data.message == "please fil all fields") {
          setError("Please fill all the fields");
        } else if (result.data.message == "email not found") {
          setError("Email not found");
        } else if (result.data.message == "incorrect password") {
          setError("incorrect password");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>

        <h2 className="heading">Login</h2>
        <p>Email</p>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{error}</p>
        <button type="submit" className="login-btn common-btn">
          Submit
        </button>
        <Link to="/register" className="account">
          Don't have an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
