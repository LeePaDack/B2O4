import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";
import axios from "axios";
const StadiumReviewMain = () => {
  const [stadiumList, setStadiumList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stadiums = async () => {
    try {
      const response = await axios.get('/api/stadiumReview');
      setStadiumList(response.data);
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    stadiums();
  }, []);
  return (
    <div className="stadiumReviewMain-container">
      <h1 className="headers">:축구공:구장 평가:축구공:</h1>
      <Link to="/memberInfo">
        <button className="memberchange-btn">참가자 평가</button>
      </Link>
      <div className="stadiumReviewMain-content">
        {isLoading ? (
          <div className="loading-spinner">
            <img src="./loading.gif"/>
          </div>
        ) : (
          stadiumList.map(list => (
            <Link key={list.stadiumNo} to={`/stadiumReviewDetail/${list.stadiumNo}`} state={{ list: list }} className="stadiumReview-link">
              <div className="stadiumReview">
                <img src={list.stadiumImage} className="stadiumReview-img" alt={list.stadiumName} />
                <div className="stadiumReview-textline">
                  <h2>{list.stadiumName}</h2>
                  <hr />
                  <p>지역 : {list.stadiumLocation}</p>
                  <p>수용가능 인원 : {list.stadiumCapacity} 명</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default StadiumReviewMain;