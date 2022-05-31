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
    if (bunkerName == "" || lat == "" || long == "" ) {
        setShowBanner(true);
        return;
      }
    let data={
        name:bunkerName,
        lat:lat,
        long:long,
        isAlive:alive
    }
    //todo: rest call yeomans :)

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