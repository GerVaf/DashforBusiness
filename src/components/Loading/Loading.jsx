import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="flex flex-col items-center h-[85vh] justify-center" id="main-container">
      <svg
        width="300"
        height="300"
        xmlns="http://www.w3.org/2000/svg"
        className="rect-loading"
        viewBox="0 0 300 300"
      >
        <g id="rect-group">
          <title>rectangle bounce loading</title>
          <rect
            className="bar"
            width="10"
            height="10"
            transform="translate(120,0)"
            y="180"
          ></rect>
          <rect
            className="bar"
            width="10"
            height="10"
            transform="translate(135,0)"
            y="180"
          ></rect>
          <rect
            className="bar"
            width="10"
            height="10"
            transform="translate(150,0)"
            y="180"
          ></rect>
          <rect
            className="bar"
            width="10"
            height="10"
            transform="translate(165,0)"
            y="180"
          ></rect>
        </g>
      </svg>
      <p>Wait a moment. . . </p>
    </div>
  );
};

export default Loading;
