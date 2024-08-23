import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";

const MemberMain = () => {
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/memberReview");
        setMemberList(response.data);
      } catch (error) {
        console.error("유저 리스트 불러오기 실패 : ", error);
      } finally {
        setIsLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="memberReviewMain-container">
      <h1 className="headers">😎참가자 평가😎</h1>
      <Link to="/stadiumInfo">
        <button className="stadiumchange-btn">구장 평가</button>
      </Link>
      <div className="memberReviewMain-content">
        {isLoading ? ( // 로딩 중이면 로딩 메시지 또는 스피너 표시
          <div className="loading-spinner">
            {/* 로딩 GIF 또는 메시지 표시 */}
            <img src="./loading.gif" alt="로딩 중" />
          </div>
        ) : (
          memberList.map((list) => (
            <Link
              key={list.memberNo}
              to={`/memberdetail/${list.memberNo}`}
              state={{ list: list }}
              className="memberReview-link"
            >
              <div className="memberReview">
                {/* 클릭한 참가자 리뷰 페이지로 넘어가야 함 */}
                <img
                  src={`/images/${list.memberProfile}`}
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
          ))
        )}
      </div>
    </div>
  );
};

export default MemberMain;
