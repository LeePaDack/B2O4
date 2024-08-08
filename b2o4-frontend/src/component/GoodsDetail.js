import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/GoodsDetail.css";
import addShoppingBasket from "./ShoppingBasket";

//디테일
const GoodsDetail = () => {
  const returnButton = useNavigate();
  const location = useLocation();
  const good = location.state.good;


  //샵으로 돌아가기
  const returnToGoodsShop = () => {
    returnButton("/");
  };

  


  //각 이미지 출력
  const imgSrc1 = `${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`;     //이미지1
  console.log(imgSrc1);
  const imgSrc2 = `${process.env.PUBLIC_URL}/images/goodsImage2/${good.goodsImage2}`;   //이미지2
  console.log(imgSrc2);

  
  return (
    <div className="detail-container">
      <h2>{good.goodsName}</h2>
      <hr></hr>
      <img src={imgSrc1} alt={good.goodsImage} />
      <img src={imgSrc2} alt={good.goodsImage2} />      {/* 상세페이지 2번쨰사진 */}

        <div className="detail-text">
            <p> ₩ {good.goodsPrice.toLocaleString()}</p>
            <p>   {good.goodsDetail} </p>
        </div>


        <div className="buttons">
            <div className="cartadd-button">
            <button  onClick={() => addShoppingBasket(good)}>장바구니에 추가</button>
            </div>
            <div className="back-button">
            <button onClick={() => returnToGoodsShop()}>샵으로 돌아가기</button>
            </div>
        </div>
        
    </div>
  );
};

export default GoodsDetail;