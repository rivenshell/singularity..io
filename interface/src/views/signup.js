import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../styles/demo.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordError, setPasswordError] = useState(false)
    const navigate = useNavigate();

    const userSignup = (email, password) =>{
        if (password === confirmPassword) {
		actions.userSignup(email, password)
		navigate("/");
        }
        else {
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
                    {/* <i class="fa fa-key" aria-hidden="true"></i> */}
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
                                    <button type="button" className="btn btn-outline-primary" onClick={() => userSignup(email, password)}>Sign Up</button>
                                </div>
                            </div>

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