import React, { useContext, useEffect, useState } from "react";
import MyPageContext from "../MyPage/MyPageContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberReviewUpload = () => {
  const memberInputReview = "http://localhost:9000/api/memberinputreview";

  const { reviewList, setReviewList, loginMember } = useContext(MyPageContext);

  const [inputReview, setInputReview] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { memberNo } = useParams(); // 평가 대상의 번호

  useEffect(() => {
    if (loginMember) {
      const existingReview = reviewList.find(
        (review) =>
          review.reviewMemberNo === loginMember.memberNo &&
          review.memberNo === memberNo
      );
      if (existingReview) {
        setHasReviewed(true);
        setLiked(existingReview.likeCount > 0);
        setDisliked(existingReview.dislikeCount > 0);
        setLikeCount(existingReview.likeCount);
        setDislikeCount(existingReview.dislikeCount);
      }
    }
  }, [reviewList, loginMember, memberNo]);

  const addReview = () => {
    if (inputReview.trim().length === 0) {
      alert("평가를 작성해주세요.");
      return;
    }

    if (!memberNo.trim().length) {
      alert("참가자를 선택해주세요.");
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

    axios
      .post(memberInputReview, {
        memberNo,
        likeCount: liked ? 1 : 0,
        dislikeCount: disliked ? 1 : 0,
        memberComment: inputReview,
        reviewMemberNo: loginMember.memberNo, // 평가하는 사람의 번호
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const newReview = {
            memberReviewNo: data.memberReviewNo,
            memberNo,
            likeCount: liked ? 1 : 0,
            dislikeCount: disliked ? 1 : 0,
            memberComment: inputReview,
            reviewMemberNo: loginMember.memberNo, // 평가하는 사람의 번호
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
          <button onClick={handleLike} disabled={liked || disliked}>
            👍 {likeCount}
          </button>
          <button onClick={handleDislike} disabled={liked || disliked}>
            👎 {dislikeCount}
          </button>
        </div>
        <section>
          <label style={{ display: "none" }}>
            평가 대상 번호:
            <input
              type="text"
              value={memberNo}
              readOnly
              style={{ display: "none" }}
            />
          </label>
          <label>
            내용:
            <textarea
              type="text"
              onChange={(e) => setInputReview(e.target.value)}
              value={inputReview}
            ></textarea>
          </label><br/>
          <button onClick={addReview} disabled={hasReviewed}>
            작성하기
          </button>
        </section>
      </main>
    </div>
  );
};

export default MemberReviewUpload;
