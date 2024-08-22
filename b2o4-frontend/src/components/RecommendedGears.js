import axios from "axios";
import { useEffect, useState } from "react";

const RecommendedGears = () => {

    const [goods, setGoods] = useState([]);

    const getRecommendedGears = () => {
        axios.get("/main/goods")
        .then(res => {
            setGoods(res.data);
        })
    }

    useEffect(() => {
        getRecommendedGears();
    }, []);

    return (
        <div className='recommended-goods-container'>
            <div className='section-title'>
                <h1>Recommended Gears</h1>
                <hr/>
            </div>
            <div className='random-goods-item'>
                <div className='card-container'>
                    {goods && goods.map(gear => (
                        <div key={gear.goodsNo} className="card-body">
                            <img src={gear.goodsImage} alt='기어 사진'/>
                            <p>{gear.goodsName}</p>
                            <p>{gear.goodsPrice.toLocaleString()}원</p>
                            <button className="btn btn-outline-success">보러가기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RecommendedGears;