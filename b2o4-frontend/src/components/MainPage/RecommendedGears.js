import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RecommendedGears = () => {

    const [goodsList, setGoodsList] = useState([]);
    const navigate = useNavigate();

    const getRecommendedGears = () => {
        axios.get("/main/goods")
            .then(res => {
                setGoodsList(res.data);
            })
    }

    useEffect(() => {
        getRecommendedGears();
    }, []);

    const handleRowClick = (goods) => {
        navigate(`/goodsDetail/${goods.goodsNo}`, { state: { good: goods } });
    };

    return (
        <div className='recommended-goods-container'>
            <div className='section-title'>
                <Link to="/goodsShop"><h1>Recommended Gears</h1></Link>
                <hr />
            </div>
            <div className='random-goods-item'>
                <div className='card-container'>
                    {goodsList && goodsList.map(goods => (
                        <div key={goods.goodsNo} className="card-body goods">
                            {goods.goodsImage ? <img src={`/images/${goods.goodsImage}`} alt='기어 사진' />
                            : <img src="/images/defaultImage.png" alt="이미지 없음"/>}
                            <div className="goods-desc">
                                <p className="goodsName">{goods.goodsName}</p>
                                <p className="goodsPrice">{goods.goodsPrice.toLocaleString()}원</p>
                            </div>
                            <button className="btn btn-outline-success" onClick={() => {handleRowClick(goods)}}>보러가기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RecommendedGears;