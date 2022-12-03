import React, { useState, useEffect, useContext } from "react";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordError, setPasswordError] = useState(false)
    const [islogged, setIsLogged] = useState(null)


    const auth = getAuth(app);

    function createAccount(auth, email, password) {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setIsLogged(user)
                    console.log(user)
                    // ...

                })
        } else {
            setPasswordError(true)
        }
    }

    return (
        <div>
            {passwordError && <div>Password is not the same</div>}

            <label for="username">Username*</label> <br></br>
            <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email} /> <br></br>
            <label for="wordpass">Password*</label> <br></br>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="wordpass" name="wordpass" /><br></br>
            <label for="username">Confirm Password*</label> <br></br>
            <input type="password" id="username" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />

            <button type="button" class="btn btn-primary" onClick={() => createAccount(auth, email, password)}>Sign Up</button>

            {islogged && <Navigate to="/" />}

        </div>
    )
}

export default Signup