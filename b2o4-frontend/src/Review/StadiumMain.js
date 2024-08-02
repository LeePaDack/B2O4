import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";
import axios from "axios";



const StadiumsInfo = () => {

    const [stadiumList, setStadiumList] = useState([]);

    const stadiums = async () => {
        const response = await axios.get('/api/stadiumReview');
        setStadiumList(response.data);
    }

    useEffect(() => {
        stadiums();
        
    },[]);
  return (
    <div className="stadiumReviewMain-container">
        <h1>구장 평가</h1>
        <Link to="/memberInfo"><button>참가자 평가</button></Link>
      <div className="stadiumReviewMain-content">
        {stadiumList.map(list => (

        <div className="stadiumReview" key={list.stadiumNo}>
            {/* 클릭한 풋살장 리뷰 페이지로 넘어가야 함 */}
          <Link to="/" className="stadiumReview-link">
            <img src={list.stadiumImage} className="stadiumReview-img" />
            <div className="stadiumReview-textline">
              <h2>{list.stadiumName}</h2><hr/>{/* 풋살장 이름 */}
              <p>지역 : {list.stadiumLocation}</p>{/* 구장지역 */}
              <p>수용가능 인원 : {list.stadiumCapacity} 명</p>{/* 수용가능 인원 */}
            </div>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumsInfo;
