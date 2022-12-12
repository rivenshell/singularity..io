import React, { useState, useEffect, useContext } from "react";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/demo.css";

const Signup = () => {
    const { store, actions } = useContext(Context);
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
                    console.log('EWFGRG')
                    
				    console.log(typeof user);
                    // ...
                    // actions.userLogged(user)

                })
        } else {
            setPasswordError(true)
        }
    }

    return (
        <div className="container">
            {passwordError && <div>Password is not the same</div>}
            <div className="container">
                <div className="row">
                    <div class="col-lg-3 col-md-2"></div>   
                    <div class="col-lg-6 col-md-8 login-box">
                    <div class="col-lg-12 login-key">
                    <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                        <div class="col-lg-12 login-title">
                        SIGNUP
                        </div>

                        <div class="col-lg-12 login-form">
                            <div class="col-lg-12 login-form">
                            <form>
                            <div class="form-group">
                                <label class="form-control-label" for="username">USERNAME*</label> 
                                <input class="form-control" type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email} /> 
                            </div>
                            <div class="form-group">
                                <label className="form-control-label" for="wordpass">PASSWORD*</label> 
                                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="wordpass" name="wordpass" />
                            </div>
                            <div class="form-group">
                                <label className="form-control-label" for="username">CONFIRM PASSWORD*</label> 
                                <input className="form-control" type="password" id="username" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} /> 
                            </div>

                            <div class="col-lg-12 loginbttm">
                                <div class="col-lg-6 login-btm login-button">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => createAccount(auth, email, password)}>Sign Up</button>
                                </div>
                            </div>



            {islogged && <Navigate to="/" />}
                            </form>
                            </div>
                        </div>
                    
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup