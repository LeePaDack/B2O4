import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StadiumList = ({}) => {
    const [stadiums,setStadiums] = useState([]);

    useEffect(() => {
        AllStadiumList();
    }, []);

    const AllStadiumList = async() => {
        const res = await axios.get('/stadiums');
        setStadiums(res.data);
    };
    console.log("스타디움 정보 DB 에서 불러오기" , stadiums);
    return (
        <table>
            <thead>
                <tr>
                    <th>구장사진</th>
                    <th>구장이름</th>
                </tr>
            </thead>
            <tbody>
                {stadiums.map(stadium => ( 
                    <tr key={stadium.stadiumNo}>
                        <td>{stadium.stadiumNo}</td>
                        <Link to={`/stadiumDetail/${stadium.stadiumNo}`} state={{stadium: stadium}}><td><img src={`../images${stadium.stadiumImage}`}/></td></Link>
                        <td>{stadium.stadiumName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )


}

export default StadiumList;
