import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/StadiumMainCss.css";
import axios from "axios";

const StadiumsInfo = () => {

    const [stadiumList, setStadiumList] = useState([]);

    const stadiums = async () => {
        const response = await axios.get('/stadium');
        setStadiumList(response.data);
    }

    useEffect(() => {
        stadiums();
        
    },[]);
  return (
    <div className="stadiumMain-container">
      <div className="stadiumMain-content">
        {stadiumList.map(list => (

        
        <div className="stadium" key={list.stadiumNo}>
            {/* 클릭한 풋살장 리뷰 페이지로 넘어가야 함 */}
          <Link to="/" className="stadium-link">
            <img src="/player.png" className="stadium-img" />
            <div className="stadium-textline">
              <h2>{/* 풋살장 이름 넣기 */}{list.stadiumName}</h2>
              <p>{/* 구장지역 넣기 */}지역 : {list.stadiumLocation}</p>
              <p>{/* 수용가능 인원 */}수용가능 인원 : {list.stadiumCapacity}</p>
            </div>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumsInfo;
