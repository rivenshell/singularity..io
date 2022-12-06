import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../styles/demo.css";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [passwordError, setPasswordError] = useState(false)
  const [islogged, setIsLogged] = useState(null)


  const auth = getAuth(app);

  onAuthStateChanged(auth, (user)=>{
    if (user){
      console.log(user)
    }
  })

  function createAccount(auth, email, password) {
   if (password === confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setIsLogged(user)
      console.log(user)
      // ...

    })
   }else{
    setPasswordError(true)
   }
  }

  return (
    <div className="container">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              <i class="fa fa-key" aria-hidden="true"></i>
            </div>
            <div class="col-lg-12 login-title">
              LOGIN
            </div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form>
                  <div class="form-group">
                    <label class="form-control-label">USERNAME</label>
                    <input type="text" class="form-control" id="user" />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input type="password" class="form-control" id="password" />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-button">

                      <button type="button" data-backdrop="false"  class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        SIGN UP </button>


                      {/* Sign Up Function */}
                      <div class="upsign modal" id="exampleModal" data-backdrop="false"  tabindex="-1" aria-labelledby="exampleModalLabel">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Create Account</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {passwordError && <div>Password is not the same</div>}
                            <div class="modal-body">
                              <label for="username">Username*</label> <br></br>
                              <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email} /> <br></br>
                              <label for="wordpass">Password*</label> <br></br>
                              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="wordpass" name="wordpass" /><br></br>
                              <label for="username">Confirm Password*</label> <br></br>
                              <input type="password" id="username" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" onClick={() => createAccount(auth, email, password)}>Sign Up</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Sign Up Function */}
                      { islogged && <Navigate to="/" />  }

                      &nbsp;&nbsp;
                      <button type="submit" class="btn btn-outline-primary">Login</button>


                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
      {/* <br />
			<Link to="/">
				<button className="home btn btn-primary">Back home</button>
			</Link> */}
    </div>
  );
};
