import React from "react";
import { Link } from "react-router-dom";

const NaverApi = () => {
  return (
    <div>
      <Link to="http://localhost:9000/naverLogin">        
        <img
          height="50"
          src="btnW_icon_circle.PNG"
          alt="Naver Login"
        />
      </Link>
    </div>
  );
};

export default NaverApi;