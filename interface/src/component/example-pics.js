import React, { Component } from "react";
import robot from "../img/robot-dancing.jpg";
import bear from "../img/teddy-bear.jpg";
import mars from "../img/apocaliptic-mars.jpg";
import "../styles/example-pics.css";

export const Pics = () => (
<div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={bear}/>
                    <div className="img-info">
                        <p>A photo of a teddy bear on a skateboard in Times Square</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={mars} />
                    <div className="img-info">
                        <p>Apocaliptic future in Mars</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={robot}/>
                    <div className="img-info">
                        <p>A futuristic robot dancing in front of a mountain</p>
                    </div>
                </div>
            </div>
            </div>
);