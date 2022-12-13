import React, { useState, useEffect, useContext } from "react";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/aboutus.css";

const Aboutus = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordError, setPasswordError] = useState(false)
    const [islogged, setIsLogged] = useState(null)


    const auth = getAuth(app);
    console.log(store.loggedin)

    function createAccount(auth, email, password) {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setIsLogged(user)
                    console.log('EWFGRG')
                    
				    console.log(typeof user);
                    // ...
                    actions.userLogged(user)

                })
        } else {
            setPasswordError(true)
        }
    }

    return (
        <div>
      
      
        <div class="title">
        <h5>What is our Website?</h5>
        </div>
        <div class="content">
           
            <p>We’ve trained a neural network called DALL·E that creates images from text captions for a wide range of concepts expressible in natural language.</p>
        </div>
   
        <h3>The Creative Crew</h3>
    
   
    <div class="row align-items-center">
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
  </div>
        </div>
    )
}

export default Aboutus