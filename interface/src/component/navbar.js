import React, { useState } from "react";
import { Link , Navigate} from "react-router-dom";
import blue from "../img/singluarity.jpg";
import "../styles/navbar.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/FirebaseConfig";

export const Navbar = () => {
	const [signedIn, setSignedIn] = useState()
const auth = getAuth(app);

onAuthStateChanged(auth, (user)=>{
    if (user){
    //   console.log(user)
	setSignedIn(user)
    }
  })

function signOutUser(){
	signOut(auth).then(() => {
		// Sign-out successful.
		console.log(" Sign-out successful.")
	  }).catch((error) => {
		// An error happened.
	  });
}

	return (
		<nav className="navbar sticky-top">
			<div className="container-fluid ">
				<Link className="navbar-brand" to="/">
					<img src={blue} width="50" height="50" className="d-inline-block align-text-top nav-logo" />
					<p className="logo-title">Singularity</p>
				</Link>

				<div className="d-flex" role="search">

				{ ! signedIn && <Link to="/demo">
						<button className="btn me-3 nav-login">Login</button>
					</Link>}

					<Link to="/signup">
						<button className="btn me-3 nav-login" id="btn-2">Signup</button>
					</Link>
					{signedIn && <button className="btn me-3 nav-login" onClick={signOutUser}>Sign Out</button>}

				</div>
			</div>
		</nav>
	);
};
