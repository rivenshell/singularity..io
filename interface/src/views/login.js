import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../styles/demo.css";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { actions } = useContext(Context);
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
  const navigate = useNavigate();


	const userLogin = (email, password) =>{
		actions.userLogin(email, password);
		navigate("/");
	}

  return (
    <div className="container">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              {/* <i class="fa fa-key" aria-hidden="true"></i> */}
            </div>
            <div class="col-lg-12 login-title">
              LOGIN
            </div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form>
                  <div class="form-group">
                    <label class="form-control-label">USERNAME</label>
                    <input type="text" class="form-control" id="user" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-button">
                      &nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-primary" onClick={() => userLogin(email, password)}>Login!</button>

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
