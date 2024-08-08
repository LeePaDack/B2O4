import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import StadiumReviewUpload from "./StadiumReviewUpload";

const StadiumDetail = () => {
    const location = useLocation();
    const list = location.state.list;
    const [contentBoxView, setContentBoxView] = useState(false);
    const [reviews, setReviews] = useState([]);

    // stadiumNo를 가져오기 위해 useParams 사용
    const { stadiumNo } = useParams();

    useEffect(() => {
        // stadiumNo에 해당하는 리뷰를 가져옵니다.
        axios.get(`/api/stadiumReview/${stadiumNo}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error("리뷰를 불러오는데 실패했습니다.", error);
            });
    }, [reviews]);

    return (
        <div className="stadiumdetail-container">
            <div className="stadiumdetail-content">
                <img src={list.stadiumImage} alt={list.stadiumName} />
                <p>풋살장 이름 : {list.stadiumName}</p>
                <p>매칭 인원 수 : {list.stadiumCapacity} 명</p>
                <p>주소 : {list.stadiumAddress}</p>
            </div>
            <div className="stadiumreview">
                <button onClick={() => setContentBoxView(!contentBoxView)}>
                    {contentBoxView ? '닫기' : '작성하기'}
                </button>
                <div className="contentBoxView-wrapper">
                    {contentBoxView && <StadiumReviewUpload />}
                </div>

                {/* 구장 리뷰들 보여줘야 함 */}
                <div className="reviews">
                    <h2>리뷰</h2>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.stadiumReviewNo} className="review">
                                <p>{review.stadiumComment}</p>
                                <p>작성 날짜 : {review.stadiumCommentDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>리뷰가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StadiumDetail;
