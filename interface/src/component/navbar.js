import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import blue from "../img/singluarity.jpg";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const userLogout = () => {
		actions.userLogout();
		navigate("/");
		window.location.reload();
	  };

	return (
		<nav className="navbar sticky-top">
			<div className="container-fluid ">
				<Link className="navbar-brand" to="/">
					<img src={blue} width="50" height="50" className="d-inline-block align-text-top nav-logo" />
					<p className="logo-title">Singularity</p>
				</Link>

				<div className="d-flex" role="search">

				{ ! store.currentUser.email && <Link to="/login">
						<button className="btn me-3 nav-login">Login</button>
					</Link>}

				{ ! store.currentUser.email &&	<Link to="/signup">
						<button className="btn me-3 nav-login" id="btn-2">Signup</button>
					</Link>}
					{store.currentUser.email && <div class="dropdown">
  					<button class="btn btn-secondary dropdown-toggle me-3 nav-login" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					<i class="fa-regular fa-user"></i>
  					</button>
  					<ul class="dropdown-menu">
    				<li><a class="dropdown-item" href="#">Profile</a></li>
    				<li><a class="dropdown-item" href="#">Saved Images</a></li>
    				<li><a class="dropdown-item" href="#">Something else here</a></li>
  					</ul>
					</div>}
					{store.currentUser.email && <button className="btn me-3 nav-login" onClick={userLogout}>Sign Out</button>}
					
				</div>
			</div>
		</nav>
	);
};
