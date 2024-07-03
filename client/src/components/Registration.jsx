import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .post("http://localhost:5000/auth/register", { name, email, password })
      .post("https://make-friends-seven.vercel.app/auth/register", { name, email, password })
      .then((result) => {
        if (result.data.message == "user register successfully") {
          console.log(result);
          navigate("/login");
        } else if (result.data.message == "please fil all fields") {
          setError("Please fill all the fields");
        } else if (result.data.message == "email already exist") {
          setError("Email already exist");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
          {/* <img src="/assets/logi1.png" className="logo-img img-login"/> */}
        <h2 className="heading">Sign Up</h2>

        <p>Name</p>
        <input
          type="text"
          className="login-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Link to="/login" className="account">
          Already have an account{" "}
        </Link>
      </form>
    </div>
    
  );
};

export default Registration;