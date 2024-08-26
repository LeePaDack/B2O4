import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
                <Link to="/goodsShop"><h1>Recommended Gears</h1></Link>
                <hr />
            </div>
            <div className='random-goods-item'>
                <div className='card-container'>
                    {goods && goods.map(gear => (
                        <div key={gear.goodsNo} className="card-body goods">
                            {gear.goodsImage ? <img src={gear.goodsImage} alt='기어 사진' />
                            : <img src="/images/defaultImage.png" alt="이미지 없음"/>}
                            <div className="goods-desc">
                                <p className="goodsName">{gear.goodsName}</p>
                                <p className="goodsPrice">{gear.goodsPrice.toLocaleString()}원</p>
                            </div>
                            <Link to={`/goodsShop/${gear.goodsNo}`}><button className="btn btn-outline-success">보러가기</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RecommendedGears;