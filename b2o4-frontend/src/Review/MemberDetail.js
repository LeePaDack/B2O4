import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MemberReviewUpload from "./MemberReviewUpload";
import axios from "axios";

const MemberDetail = () => {
  const location = useLocation();
  const list = location.state.list;
  const [contentBoxView, setContentBoxView] = useState(false);
  const [reviews, setReviews] = useState([]);

  const {memberNo} = useParams();

  useEffect(() => {
    axios
      .get(`/api/memberReview/${memberNo}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("리뷰를 불러오는데 실패했습니다.", error);
      });
  }, [reviews]);

  return (
    <div className="memberdetail-container">
      <div className="memberdetail-content">
        <img src={`/images/userProfile/${list.memberProfile}`} />
        <p>참가자 이름 : {list.memberName}</p>
        <p>참가 매치 수 : {list.matchCount}</p>
        <p>랭크 : {list.memberRank}</p>
      </div>
      <div className="memberreview">
        <button
          onClick={() => {
            setContentBoxView(!contentBoxView);
          }}
        >
          {contentBoxView ? "닫기" : "작성하기"}
        </button>
        <div className="contentBoxView-wrapper">
          {contentBoxView && <MemberReviewUpload />}
        </div>
        <div className="reviews">
          <h2>평가</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.memberReviewNo} className="review">
                
                <p>{review.memberComment}</p>
                <p>작성 날짜 : {review.memberCommentDate}</p>
              </div>
            ))
          ) : (
            <p>평가 글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
