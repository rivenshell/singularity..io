import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/demo.css";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [islogged, setIsLogged] = useState(null)
  const [logEmail, setLogEmail] = useState()
  const [logPassword, setLogPassword] = useState()
  const [passwordError, setPasswordError] = useState(false)
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user)=>{
    if (user){
      console.log(user)
    }
  })
  
  function logIn (auth, logEmail, logPassword){
  signInWithEmailAndPassword(auth, logEmail, logPassword)
  .then((userCredential) => {
      const user = userCredential.user;
      setIsLogged(user)
      console.log(user);
      // alert('Successfully signed in')
  })
  .catch((error) => {
    alert("Wrong Info")
  });
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
                    <input type="text" class="form-control" id="user" onChange={(e) => setLogEmail(e.target.value)} value={logEmail}/>
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input type="password" class="form-control" id="password" onChange={(e) => setLogPassword(e.target.value)} value={logPassword} />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-button">
                      &nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-primary" onClick={() => logIn(auth, logEmail, logPassword)}>Login!</button>

                    </div>
                  </div>

                  { islogged && <Navigate to="/" />  }
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
     
    </div>
  );
};
