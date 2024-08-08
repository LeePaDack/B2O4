import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import StadiumReviewUpload from "./StadiumReviewUpload";

const StadiumDetail = () => {

    const location = useLocation();
    const list = location.state.list;
    console.log(location);
    const [contentBoxView, setContentBoxView] = useState(false);


   
    return (
        <div className="stadiumdetail-container">
            <div className="stadiumdetail-content">
                <img src={list.stadiumImage}/>
                <p>풋살장 이름 : {list.stadiumName}</p>
                <p>매칭 인원 수 : {list.stadiumCapacity} 명</p>
                <p>주소 : {list.stadiumAddress}</p>
            </div>
            <div className="stadiumreview">
                
                <button onClick={() => {setContentBoxView(!contentBoxView)}}>
                    {contentBoxView ? ('닫기') : ('작성하기')}
                </button>
                <div className="contentBoxView-wrapper">
                    {contentBoxView === true && (<StadiumReviewUpload/>)}
                </div>
            </div>
        </div>
    )
}
export default StadiumDetail;