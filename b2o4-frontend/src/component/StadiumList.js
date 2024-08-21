import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/StadiumList.css';
import Pagination from "./PagiNation";

const StadiumList = () => {
    const [stadiums, setStadiums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemPerPage] = useState(6); // 한 페이지에서 게시글 6개 씩 보여줌
    const [stadiumSearch, setStadiumSearch] = useState(''); // 검색어
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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // stadiumName 또는 stadiumAddress와 검색어를 비교하여 필터링
    const filteredStadiums = stadiums.filter((stadium) =>
        stadium.stadiumName.toLowerCase().includes(stadiumSearch.toLowerCase()) ||
        stadium.stadiumAddress.toLowerCase().includes(stadiumSearch.toLowerCase())
    );

    const lastItem = currentPage * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const itemList = filteredStadiums.slice(firstItem, lastItem);

    console.log("필터링된 스타디움 정보:", filteredStadiums);

    return (
        <div className="stadium-list-container">
            <div className="stadium-search-input-button">
                <input
                    type="text"
                    placeholder="구장을 검색하세요."
                    onChange={(e) => setStadiumSearch(e.target.value)}
                    className="stadium-search-input"
                />
                <button onClick={() => paginate(1)} className="stadium-search-button">🔍</button>
            </div>
            <div className="row stadium-list-block">
                {itemList.map(stadium => (
                    <div className="col-4 stadium-item" key={stadium.stadiumNo} onClick={() => handleRowClick(stadium)}>
                        <div className="stadiumImg-stadiumName">
                            <div className="stadium-list-img">
                                <img src={`../images${stadium.stadiumImage}`} alt={stadium.stadiumName} />
                            </div>
                        </div>
                        <div className="stadium-list-name">
                            {stadium.stadiumName} ({stadium.stadiumLocation})
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                itemPerPage={itemPerPage}
                totalItems={filteredStadiums.length}
                paginate={paginate}
                currentPage={currentPage} />
        </div>
    );
}

export default StadiumList;