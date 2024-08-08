import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MemberReviewUpload from "./MemberReviewUpload";

const MemberDetail = () => {

    const location = useLocation();
    const list = location.state.list;
    console.log(location);
    const [contentBoxView, setContentBoxView] = useState(false);

    return (
        <div className="memberdetail-container">
            <div className="memberdetail-content">
                <img src={list.memberProfile}/>
                <p>참가자 이름 : {list.memberName}</p>
                <p>참가 매치 수 : {list.matchCount}</p>
                <p>랭크 : {list.memberRank}</p>
            </div>
            <div className="memberreview">
                
                <button onClick={() => {setContentBoxView(!contentBoxView)}}>
                    {contentBoxView ? ('닫기') : ('작성하기')}
                </button>
                <div className="contentBoxView-wrapper">
                    {contentBoxView && (<MemberReviewUpload/>)}
                </div>
            </div>
        </div>
    )
}

export default MemberDetail;