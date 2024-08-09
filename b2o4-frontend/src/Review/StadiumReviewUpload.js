import React, { useContext, useState, useEffect } from "react";
import MyPageContext from "../MyPage/MyPageContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const StadiumReviewUpload = () => {

  const stadiumInputReviewAPI = "http://localhost:9000/api/stadiuminputreview";

  const { reviewList, setReviewList, loginMember } = useContext(MyPageContext);
  
  const [inputReview, setInputReview] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { stadiumNo } = useParams(); // URL에서 stadiumNo 파라미터 추출 -> 경기장번호 가져옴

  useEffect(() => {
    if (loginMember) {
      const existingReview = reviewList.find(
        (review) =>
          review.reviewMemberNo === loginMember.memberNo &&
          review.stadiumNo === stadiumNo
      );
      if (existingReview) {
        setHasReviewed(true);
        setLiked(existingReview.likeCount > 0);
        setDisliked(existingReview.dislikeCount > 0);
      }
    }
  }, [reviewList, loginMember, stadiumNo]);

  const addReview = () => {
    if (inputReview.trim().length === 0) {
      alert("평가를 작성해주세요.");
      return;
    }

    if (!stadiumNo.trim().length) {
      alert("경기장을 선택해주세요.");
      return;
    }

    if (!loginMember || !loginMember.memberNo) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (hasReviewed) {
      alert("이미 리뷰를 작성하셨습니다.");
      return;
    }

    axios.post(stadiumInputReviewAPI, {
        stadiumNo,
        likeCount: liked ? 1 : 0,
        dislikeCount: disliked ? 1 : 0,
        stadiumComment: inputReview,
        reviewMemberNo: loginMember.memberNo,
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const newReview = {
            stadiumReviewNo: data.stadiumReviewNo,
            stadiumNo,
            likeCount: liked ? 1 : 0,
            dislikeCount: disliked ? 1 : 0,
            stadiumComment: inputReview,
            reviewMemberNo: loginMember.memberNo,
          };

          const newReviewList = Array.isArray(reviewList)
            ? [...reviewList, newReview]
            : [newReview];

          setReviewList(newReviewList);
          setInputReview("");
          setHasReviewed(true);
        } else {
          alert("리뷰 업로드에 실패했습니다.");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleLike = () => {
    if (!liked && !disliked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleDislike = () => {
    if (!liked && !disliked) {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
    }
  };

  return (
    <div>
        <main>
            <div>
                <button onClick={handleLike} disabled={liked || disliked}>👍 {likeCount}</button>
                <button onClick={handleDislike} disabled={liked || disliked}>👎 {dislikeCount}</button>
            </div>
            <section>
                <label style={{ display: 'none' }}>경기장 번호:
                    <input type="text" value={stadiumNo} readOnly style={{ display: 'none' }} />
                </label>
                <label>내용:
                    <textarea type="text" onChange={e => setInputReview(e.target.value)} value={inputReview}></textarea>
                </label>
                <button onClick={addReview} disabled={hasReviewed}>작성하기</button>
            </section>
            <section>
                {reviewList.map((review, index) => (
                    <div key={index}>
                        <p>{review.stadiumComment}</p>
                    </div>
                ))}
            </section>
        </main>
    </div>
);
};

export default StadiumReviewUpload;
