import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";
import axios from "axios";

const StadiumsMain = () => {
  const [stadiumList, setStadiumList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

  const stadiums = async () => {
    try {
      const response = await axios.get('/api/stadiumReview');
      setStadiumList(response.data);
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    } finally {
      setIsLoading(false);  // 로딩 상태 업데이트
    }
  };

  useEffect(() => {
    stadiums();
  }, []);

  return (
    <div className="stadiumReviewMain-container">
      <h1 className="headers">⚽구장 평가⚽</h1>
      <Link to="/memberInfo">
        <button className="memberchange-btn">참가자 평가</button>
      </Link>
      <div className="stadiumReviewMain-content">
        {isLoading ? (  // 로딩 중이면 로딩 메시지 또는 스피너 표시
          <div className="loading-spinner">
            <img src="./loading.gif"/>
          </div>
        ) : (
          stadiumList.map(list => (
            <Link key={list.stadiumNo} to={`/stadiumdetail/${list.stadiumNo}`} state={{ list: list }} className="stadiumReview-link">
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

export default StadiumsMain;
