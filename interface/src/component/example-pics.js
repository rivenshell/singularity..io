import React, { Component } from "react";
import robot from "../img/robot-dancing.jpg";
import bear from "../img/teddy-bear.jpg";
import mars from "../img/apocaliptic-mars.jpg";
import "../styles/example-pics.css";

export const Pics = () => (
<div className='container-fluid'>
<div className='row'>
    <div className="col-lg-4 col-md-4"><img className="img-fluid" src={bear} /></div>
    <div className="col-lg-4 col-md-4"><img className="img-fluid" src={mars} /></div>
    <div className="col-lg-4 col-md-4"><img className="img-fluid" src={robot}/></div>
</div>
</div>
);