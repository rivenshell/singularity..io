import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.js";
import { Demo } from "./views/demo";
import Signup from "./views/signup";
//import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import {Pics} from "./component/example-pics"

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
			
					<Navbar />
					<Routes>
						<Route exact path="/" element={ <App /> }>
						</Route>
						<Route exact path="/demo" element={ <Demo />}>
						</Route>
						<Route exact path="/signup" element={ <Signup />}>
						</Route>

                        </Routes>
					<Pics />
                    <Footer />
                        {/*
						
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>  */}
					
					{/* <Footer />  */}
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);