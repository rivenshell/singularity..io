import React, { useState, useEffect, useContext } from "react";
import { app } from "../firebase/FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import christian from "../img/christian.jpg";
import riven from "../img/rivenshell.jpg";
import chris from "../img/chris.jpg";
import "../styles/aboutus.css";

const Aboutus = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="description">
        <h3 className="title">What is Our Website?</h3>
        <p1>We’ve trained a neural network called DALL·E that creates images from text captions for a wide range of concepts expressible in natural language.</p1>
      </div>

      <div className="crew">
        <h5>The Creative Crew</h5>

        <div class="grid">

          <img src={christian} class="img-thumbnail"></img>
          <img src={riven} class="img-thumbnail"></img>
          <img src={chris} class="img-thumbnail"></img>
        </div>
      </div>


    </div>


  )
}

export default Aboutus