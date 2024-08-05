import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/GoodsDetail.css";

const GoodsDetail = () => {
  const returnButton = useNavigate();
  const location = useLocation();
  const good = location.state.good;

  const returnToGoodsShop = () => {
    returnButton("/");
  };

  const imgSrc = `${process.env.PUBLIC_URL}/images/${good.goodsImage}`;
  console.log(imgSrc);

  return (
    <div className="detail-container">
      <h2>{good.goodsName}</h2>
      <hr></hr>
      <img src={imgSrc} alt={good.goodsImage} />

        <div className="detail-text">
            <p>   {good.goodsDetail} </p>
            <p> ₩ {good.goodsPrice}</p>
        </div>

        <div className="return-button">
            <button onClick={() => returnToGoodsShop()}>샵으로 돌아가기</button>
        </div>
    </div>
  );
};

export default GoodsDetail;
