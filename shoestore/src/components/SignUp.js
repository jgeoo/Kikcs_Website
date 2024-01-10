import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSignUP = () =>{
  if(email === "" || password === "" )
    return
  if(password.length < 6){
    alert("Password too short");
    return
  }

  try{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        return
      });
      navigate("/main")
    }catch(e){
      console.log(e)
      return
    }
  }


  return (
    <div className="sign-in-container">
      <form onSubmit={HandleSignUP}>
        <h1>Create Account</h1>
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
        <button type="submit" className="btn2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;