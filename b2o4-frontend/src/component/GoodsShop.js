import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/GoodsShop.css';

const GoodsShop = () => {
    const [goods, setGoods] = useState([]); 
    const [shoppingBasket, setShoppingBasket] = useState([]);

    const addToShoppingBasket = (good) => {
        setShoppingBasket([...shoppingBasket, good]);
    };

    //  useEffect -> 자바에서 데이터를 맨 처음 가져오고 마는 코드
    useEffect(() => {
        axios.get('http://localhost:9000/goods/all')
            .then(response => { //자바에서 가져오기 성공했을 경우
                setGoods(response.data); //  goods 에 자바에서 가져온 데이터를 모두 집어넣기
            })
            .catch(err => { //가져오기 실패했을 경우
                console.log("Error: ", err);
            });
    }, []);

    return (
        <div className='goods-container'>
            <h1>축구화</h1>
            <div className='goods-content'>
                {goods.map(good => {/* process = 컴퓨터 env = 환경에서 PUBLIC_URL = 퍼블릭 폴더가 있는 위치에   images = 이미지 폴더 안에 good.goodsImage = 지금 가져와야할 상품의 이미지 가져오기  
                alt= 이미지가 안보일 때 개발자가 이미지를 찾아서 다시 보이게 넣을 수 있도록 설명 작성
                */
                    const imgSrc = `${process.env.PUBLIC_URL}/images/${good.goodsImage}`;
                    console.log(imgSrc);
                    return (
                        <div key={good.goodsNo} className='goods'>
                            <img src={imgSrc} alt={good.goodsImage} />
                            <h2>{good.goodsName}</h2>
                            <p>상품종류 : {good.goodsKind}</p>
                            <p>상품가격 : {good.goodsPrice}</p>
                            <p>사이즈 : {good.goodsSize}</p>
                            <p>판매상태 : {good.goodsSellNow ? "판매중" : "판매중지"}</p>
                            <button onClick={() => addToShoppingBasket(good)}>장바구니에 추가</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    
};

export default GoodsShop;
