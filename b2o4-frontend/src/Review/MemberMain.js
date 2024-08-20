import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";

const MemberMain = () => {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/memberReview")
      .then((response) => {
        setMemberList(response.data);
      })
      .catch((error) => {
        console.error("유저 리스트 불러오기 실패 : ", error);
      });
  }, []);

  return (
    <div className="memberReviewMain-container">
      <h1 className="headers">😎참가자 평가😎</h1>
      <Link to="/stadiumInfo">
        <button className="stadiumchange-btn">구장 평가</button>
      </Link>
      <div className="memberReviewMain-content">
        {memberList.map((list) => (
          <Link
            key={list.memberNo}
            to={`/memberdetail/${list.memberNo}`}
            state={{ list: list }}
            className="memberReview-link"
          >
            <div className="memberReview">
              {/* 클릭한 참가자 리뷰 페이지로 넘어가야 함 */}
              <img
                src={`/images/userProfile/${list.memberProfile}`}
                className="memberReview-img"
                alt={`${list.memberName} 프로필`}
              />
              <div className="memberReview-textline">
                <h2>{list.memberName}</h2>
                <hr />
                {/* 참가자 이름 */}
                <p>레벨 : {list.memberRank}</p>
                {/* 참가자 레벨 (루키, 아마추어, 세미프로) */}
                <p>참여 경기 수 : {list.memberCount} 게임</p>
                {/* 참여 경기 수 */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MemberMain;
