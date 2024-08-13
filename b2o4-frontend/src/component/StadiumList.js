import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/StadiumList.css';

const StadiumList = () => {
    const [stadiums, setStadiums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        AllStadiumList();
    }, []);

    const AllStadiumList = async () => {
        const res = await axios.get('/stadiums');
        setStadiums(res.data);
    };

    const handleRowClick = (stadium) => {
        navigate(`/stadiumDetail/${stadium.stadiumNo}`, { state: { stadium } });
    };

    console.log("스타디움 정보 DB에서 불러오기", stadiums);

    return (
        <div className="stadium-list-container">
            <div className="stadium-search-input-button">
                <input type="text" placeholder="구장을 검색하세요." className="stadium-search-input"/>
                <button className="stadium-search-button"><img src="../../public/images/Emoji_glass.png"/></button>
            </div>
            <div className="stadium-list-block">
                {stadiums.map(stadium => (
                    <div className="col-4 stadium-item" key={stadium.stadiumNo} onClick={() => handleRowClick(stadium)}>
                        <div className="stadiumImg-stadiumName">
                            <div className="stadium-list-img">
                                <img src={`../images${stadium.stadiumImage}`} alt={stadium.stadiumName}/>
                            </div>
                            <div className="stadium-list-name">
                                {stadium.stadiumName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h1>페이지네이션 들어가야함...</h1>
        </div>
    );
}

export default StadiumList;