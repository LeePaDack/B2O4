import axios from "axios";
import { useEffect, useState } from "react";
import '../css/MainPage.css';
import { Link, useNavigate } from "react-router-dom";

const MonthOfTheStadiumList = () => {
    const [stadiumList, setStadiumList] = useState([]);
    const [mostLike, setMostLike] = useState('');
    const navigate = useNavigate();

    const getStadiumList = () => {
        axios.get("/main/stadium")
            .then(res => {
                setStadiumList(res.data);
            })
    }

    useEffect(() => {
        // ... : 배열을 개별 인수로 분리시킴
        const getMostLike = Math.max(...stadiumList.map(stadium => stadium.totalLike));
        console.log(getMostLike);
        const getMostLikeStadium = stadiumList.find(stadium => stadium.totalLike === getMostLike);
        setMostLike(getMostLikeStadium);
        
    }, [stadiumList])

    useEffect(() => {
        getStadiumList();
    }, []);

    const handleRowClick = (stadium) => {
        navigate(`/stadiumDetail/${stadium.stadiumNo}`, { state: { stadium } });
    };

    return (
        <div className='famous-stadium-list-container'>
            <div className='section-title'>
                <Link to="/StadiumList"><h1>Stadium of the month</h1></Link>
                <hr />
            </div>
            <div className='famous-stadium'>
                <div className='card-container' >
                    {stadiumList && stadiumList.map(stadium => (
                        <div key={stadium.stadiumNo} 
                        className={
                            `card-body ${mostLike && stadium.stadiumName === mostLike.stadiumName ? 'highlight' : '' }` 
                            }>
                            {mostLike && stadium.stadiumName === mostLike.stadiumName ?
                            <img className="hot" src="/images/hotItem.jpg" alt="핫아이템"/>  : ''}
                            {stadium.stadiumImage ? <img src={stadium.stadiumImage} alt='스타디움 사진' />
                            : <img src="defaultImage" alt="이미지 없음" />}
                            
                            <div className="stadium-desc row">
                                <div className="col-10">
                                <p className="stadiumName">{stadium.stadiumName}</p>
                                <p className="stadiumAddress">{stadium.stadiumAddress}</p>
                                <p className="stadiumCapacity">최대 수용 인원 : {stadium.stadiumCapacity} 명</p>
                                <p className="stadiumPrice">{stadium.stadiumPrice.toLocaleString()} 원(1인)</p>
                                </div>
                                <div className="col-2">
                                <p className="totalLike">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                    &nbsp;
                                    {stadium.totalLike}
                                </p>
                                </div>
                            </div>
                           <button className="btn btn-outline-success" onClick={() => {handleRowClick(stadium)}}>자세히 보기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MonthOfTheStadiumList;