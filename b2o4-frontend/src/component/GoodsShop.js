import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/GoodsShop.css';
import { Link } from "react-router-dom";

const GoodsShop = () => {
    const [goods, setGoods] = useState([]); 

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


  const addToShoppingBasket = (good) => {
    const basketItem = {
      memberNo: 1, // 실제 로그인한 회원 번호를 사용
      goodsNo: good.goodsNo,
      goodsQuantity: 1,
      basketTotal: good.goodsPrice
    };

    axios.post('http://localhost:9000/basket/add', basketItem)
      .then(() => {
        alert("장바구니에 추가되었습니다.");
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

    //축구화 - 풋살화 필터
    const soccerShoes = goods.filter(good => good.goodsKind === "축구화");
    const futsalShoes = goods.filter(good => good.goodsKind === "풋살화");

    return (
        <div className='goods-container'>
            <h1>축구화</h1>
            <div className='goods-content'>
                {soccerShoes.map(good => {/* process = 컴퓨터 env = 환경에서 PUBLIC_URL = 퍼블릭 폴더가 있는 위치에   images = 이미지 폴더 안에 good.goodsImage = 지금 가져와야할 상품의 이미지 가져오기  
                alt= 이미지가 안보일 때 개발자가 이미지를 찾아서 다시 보이게 넣을 수 있도록 설명 작성
                */
                const imgSrc = `${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`;
                console.log(imgSrc);
                return (
                    <div key={good.goodsNo} className='goods'>
                      <Link to={`/goodsDetail/${good.goodsNo}`} state={{ good: good }} className="GoodsDetail-link">
                        <img src={imgSrc} alt={good.goodsImage} />
                        <h2>{good.goodsName}</h2>
                        <p>상품종류 : {good.goodsKind}</p>
                        <p>상품가격 : {good.goodsPrice.toLocaleString()}</p>
                        <p>사이즈 : {good.goodsSize}</p>
                        <p>판매상태 : {good.goodsSellNow ? "판매중" : "판매중지"}</p>
                      </Link>
                      <button onClick={() => addToShoppingBasket(good)}>장바구니에 추가</button>
                    </div>
                  );
                })}
            </div>

            
            <h1>풋살화</h1>
            <div className='goods-content'>
                {futsalShoes.map(good => {/* process = 컴퓨터 env = 환경에서 PUBLIC_URL = 퍼블릭 폴더가 있는 위치에   images = 이미지 폴더 안에 good.goodsImage = 지금 가져와야할 상품의 이미지 가져오기  
                alt= 이미지가 안보일 때 개발자가 이미지를 찾아서 다시 보이게 넣을 수 있도록 설명 작성
                */
                const imgSrc = `${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`;
                console.log(imgSrc);
                return (
                    <div key={good.goodsNo} className='goods'>
                      <Link to={`/goodsDetail/${good.goodsNo}`} state={{ good: good }} className="GoodsDetail-link">
                        <img src={imgSrc} alt={good.goodsImage} />
                        <h2>{good.goodsName}</h2>
                        <p>상품종류 : {good.goodsKind}</p>
                        <p>상품가격 : {good.goodsPrice.toLocaleString()}</p>
                        <p>사이즈 : {good.goodsSize}</p>
                        <p>판매상태 : {good.goodsSellNow ? "판매중" : "판매중지"}</p>
                      </Link>
                      <button onClick={() => addToShoppingBasket(good)}>장바구니에 추가</button>
                    </div>
                  );
                })}
            </div>
        </div>
    );

    
};

export default GoodsShop;
