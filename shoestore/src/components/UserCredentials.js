import React, { useState } from 'react'
import {auth} from "../config/firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function () {
    const [credentials,setCredentials] = useState(false);
    const user = auth.currentUser;
    const navigate = useNavigate();
   const ShowCredentials = () => {

    if(user){
       setCredentials(true)
       console.log(user)
    }
   }
   const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  const NavigateBack = () => {
    if(user){
        navigate("/main")
    }else{
        navigate("/Login")
    }
  }
    return (
    <div>
      <h3>Your User Credentials</h3>
      <button onClick={ShowCredentials} className='button'> Show info</button>
      {credentials && user && (
        <div>
            <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={userSignOut} className='button'>Sign Out</button>
      <button onClick={NavigateBack} className='button'>Go Back</button>
    
    </div>
  )
}
