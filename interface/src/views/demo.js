import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../styles/demo.css";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export const Demo = () => {
  const { store, actions } = useContext(Context);
 
  const [islogged, setIsLogged] = useState(null)


  const auth = getAuth(app);

  onAuthStateChanged(auth, (user)=>{
    if (user){
      console.log(user)
    }
  })


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

                      
                      {/* Sign Up Function */}
                      { islogged && <Navigate to="/" />  }

                      &nbsp;&nbsp;
                      <button type="submit" class="btn btn-outline-primary">Login!</button>


                    </div>
                  </div>
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
