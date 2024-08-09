import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/ReviewCss.css';


const MemberMain = () => {
    const [memberList, setMemberList] = useState([]);

    const members = async () => {
        const response = await axios.get('/api/memberReview');
        setMemberList(response.data);
    }

    useEffect(() => {
        members();
    },[]);

    return (
        <div className="memberReviewMain-container">
        <h1>참가자 평가</h1>
        <Link to="/stadiumInfo"><button>구장 평가</button></Link>
      <div className="memberReviewMain-content">
        {memberList.map(list => (
          <Link key={list.memberNo} to={`/memberdetail/${list.memberNo}`} state={{list : list}} className="memberReview-link">
        <div className="memberReview" >
            {/* 클릭한 참가자 리뷰 페이지로 넘어가야 함 */}

            <img src={list.memberProfile} className="memberReview-img" />
            <div className="memberReview-textline">
              <h2>{list.memberName}</h2><hr/>{/* 참가자 이름 */}
              <p>레벨 : {list.memberRank}</p>{/* 참가자 레벨 (루키, 아마추어, 세미프로) */}
              <p>참여 경기 수 : {list.memberCount} 게임</p>{/* 참여 경기 수 */}
            </div>
        </div>
        </Link>
        ))}
      </div>
    </div>
    )
}

export default MemberMain;