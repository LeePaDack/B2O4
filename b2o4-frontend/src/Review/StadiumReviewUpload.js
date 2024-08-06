import React, { useContext, useState } from "react";
import MyPageContext from "../MyPage/MyPageContext";

const StadiumReviewUpload = () => {
    const {reviewList, setReviewList, loginMember} = useContext(MyPageContext);

    const [inputReview, setInputReview] = useState('');

    const addReview = () => {
        if (inputReview.trim().length === 0) {
            alert("평가를 작성해주세요.");
            return;
        }

        // loginMember가 null이거나 undefined인지 확인
        if (!loginMember || !loginMember.reviewMemberNo) {
            alert("로그인이 필요합니다.");
            return;
        }

        fetch("/api/stadiuminputreview", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: inputReview,
                reviewMemberNo: loginMember.reviewMemberNo,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((stadiumReviewNo) => {
            if (Number(stadiumReviewNo) === 0) {
                return;
            }

            const newReview = {
                stadiumReviewNo: stadiumReviewNo,
                title: inputReview,
                reviewMemberNo: loginMember.reviewMemberNo,
            };

            const newReviewList = Array.isArray(reviewList) ? [...reviewList, newReview] : [newReview];

            setReviewList(newReviewList);
            setInputReview("");
        })
        .catch((err) => console.error('Error:', err));
    };

    return (
        <div>
            <label>내용 : 
                <textarea type="text" onChange={e => setInputReview(e.target.value)} value={inputReview}></textarea>
            </label>
            <button onClick={addReview}>작성하기</button>
        </div>
    );
};

export default StadiumReviewUpload;
