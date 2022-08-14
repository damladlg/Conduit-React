import React, { useState } from "react";
import "./../assets/css/banner.css";
const user = JSON.parse(localStorage.getItem("user"));

const Banner = (props) => {
  const [username, setUserName] = useState(user);
  return (
    <>
      {!username && (
        <div className="banner">
          <div className="container title">
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
