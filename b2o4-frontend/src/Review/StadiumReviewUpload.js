import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MyPageContext from "../MyPage/MyPageContext";

const StadiumReviewUpload = () => {
   
    const [inputReview, setInputReview] = useState('');


    const addReview = () => {
        if(inputReview === null) {
            alert("텍스트를 입력해주세요.");
            setInputReview('');
            return;
        }

        fetch("/api/stadiuminputreview", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(inputReview)
        })
        .then(response => response.text())
        .then(result => {
            if(Number(result) > 0) {
                alert('등록완료되었습니다.');
                setInputReview('');
            } else {
                alert('등록실패하였습니다.');
            }
        })
        
    }

    return (
        <div>
            <label>내용 : 
                <textarea type="text" onChange={e => {setInputReview(e.target.value)}}
                value={inputReview}></textarea>
            </label>
            <button onClick={addReview}>작성하기</button>
        </div>
    )
}
export default StadiumReviewUpload;