import axios from "axios";
import { useEffect, useState } from "react";
import '../css/MainPage.css';

const StadiumList = () => {
    const [stadiumList, setStadiumList] = useState([]);

    const getStadiumList = () => {
        axios.get("/main/stadium")
            .then(res => {
                setStadiumList(res.data);
            })
    }

    useEffect(() => {
        getStadiumList();
    }, []);

    return (
        <div className='famous-stadium-list-container'>
            <div className='section-title'>
                <h1>Stadium of the month</h1>
            </div>
            <div className='famous-stadium'>
                <div className='card-body' >
                    {stadiumList && stadiumList.map(stadium => (
                        <div key={stadium.stadiumName}>
                            <img src={stadium.stadiumImage} alt='스타디움 사진' />
                            <p>{stadium.stadiumName}</p>
                            <p>인기도 : {stadium.totalLike}</p>
                            <button>예약하러가기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default StadiumList;