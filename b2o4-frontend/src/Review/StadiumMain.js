import React from "react";
import { Link } from "react-router-dom";
import "../css/StadiumMainCss.css";

const StadiumsInfo = () => {
  return (
    <div className="stadiumMain-container">
      <div className="stadiumMain-content">
        <div className="stadium">
          <Link to="/" className="stadium-link">
            <img src="/player.png" className="stadium-img" />
            <div className="stadium-textline">
              <h2>{/* 풋살장 이름 넣기 */}kh풋살장</h2>
              <p>{/* 구장지역 넣기 */}지역 : 서울시 강남</p>
              <p>{/* 수용가능 인원 */}수용가능 인원 : 5 vs 5 </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StadiumsInfo;
