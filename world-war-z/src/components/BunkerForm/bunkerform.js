import React, { useRef, useState } from "react";
import Banner from "../../components/Banner/banner";
import "./bunkerform.css";

export default function BunkerForm({setAddBunker}){
    const [showBanner, setShowBanner] = useState(false);
    const bunkerNameRef = useRef();
    const latRef = useRef();
    const longRef = useRef();
    const checkboxRef = useRef();
    
    if (showBanner)
    setTimeout(() => {
      setShowBanner(false);
    }, 10000);

  function addBunker() {
    let bunkerName=bunkerNameRef.current.value;
    let lat=latRef.current.value;
    let long=longRef.current.value;
    let alive=checkboxRef.current.value;
    /* TODO: Agrega un poco más de validación de datos como:  
      1. Rango válido de valores para latitud y longitud 
    */
    if (bunkerName == "" || lat == "" || long == "" ) {
        setShowBanner(true);
        return;
      }

    if (alive === "on") {alive = true} else {alive = false}
    let data={
        name:bunkerName,
        lat:parseFloat(lat),
        long:parseFloat(long),
        isAlive:alive
    }
    //todo: rest call yeomans :)
    console.log("La data del bunker es: \n" + data)

    fetch("http://localhost:5000/bunkers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((e) => console.log(e));

  }

  function cancelPost() {
    setAddBunker(false);
  }

    return (
        <div id="PostFormContainer">
          {showBanner && (
            <Banner status={false} message={"Fill all the text fields"} />
          )}
          <input
            type="text"
            ref={bunkerNameRef}
            className="PostFormInput"
            placeholder="Bunker Name"
          />
          <input
            type="number"
            ref={latRef}
            className="PostFormInput"
            placeholder="Bunker's latitude"
          />
          <input
            type="number"
            ref={longRef}
            className="PostFormInput"
            placeholder="Bunker's longitude"
          />
          <label>
          <input
            type="checkbox"
            ref={checkboxRef}
          />     isAlive
          </label>
            
          <div id="PostFormFooter">
            <button
              className="PostFormButton"
              style={{ backgroundColor: "#4aa0eb" }}
              onClick={() => addBunker()}
            >
              Post
            </button>
            <button
              className="PostFormButton"
              style={{ backgroundColor: "grey" }}
              onClick={() => cancelPost()}
            >
              Cancel
            </button>
          </div>
        </div>
    );
}