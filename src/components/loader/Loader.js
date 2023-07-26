import React from "react";
import  ReactDOM from "react-dom";
import spinnerImg from "../../images/Infinity.gif";
import "./Loader.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={spinnerImg} alt="loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
