import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const StadiumDetail = () => {

    const location = useLocation();
    const list = location.state.list;
    console.log(location);
    

   
    return (
        <div className="stadiumdetail-container">
            <div className="stadiumdetail-content">
                <img src={list.stadiumImage}/>
                <p>풋살장 이름 : {list.stadiumName}</p>
                <p>매칭 인원 수 : {list.stadiumCapacity} 명</p>
                <p>주소 : {list.stadiumAddress}</p>
            </div>
            <div className="stadiumreview">
                
            </div>
        </div>
    )
}
export default StadiumDetail;