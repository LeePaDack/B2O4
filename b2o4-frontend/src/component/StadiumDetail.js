import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const StadiumDetail = () => {
    
    const location = useLocation();
    const [stadiums, setStadiums] = useState([]);
    const stadium = location.state.stadium;

    console.log("location",location);

    useEffect(() => {
        StadiumDetailList();
    }, []);

    const StadiumDetailList = async() => {
        const res = await axios.get('/stadiums');
        setStadiums(res.data);
    };

    return (
        <table> 
            <tbody>
                    <tr>
                        <td><img src={`../images${stadium.stadiumImage}`}/></td>
                        <td>구장이름 : {stadium.stadiumName}</td>
                        <td>구장지역 : {stadium.stadiumLocation}</td>
                        <td>구장주소 : {stadium.stadiumAddress}</td>
                        <td>수용인원 : {stadium.stadiumCapacity}</td>
                        <td>주차여부 : {stadium.stadiumParking}</td>
                        <td>실내외 : {stadium.stadiumInOutdoor}</td>
                        <td>신발렌트 : {stadium.shoesRent}</td>
                        <td>인당가격 : {stadium.stadiumPrice}</td>
                    </tr>
            </tbody>
            <Link to={"/stadiumList"}><button>돌아가기</button></Link>
            <Link to={`/reservationStadium/${stadium.stadiumNo}`} state={{stadium: stadium}}><button>예약하기</button></Link>
        </table>
    )

}

export default StadiumDetail;
