import './SignIn.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../config/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    if (email === "" || password === "") return;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
  
      if (email === "adminkicks@gmail.com") {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleLogin}>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="btn">Log In</button>
        <h3>Need an account?</h3>
        <button className='btn2' onClick={() => navigate("/Register")}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;