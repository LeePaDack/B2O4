import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './css/GoodsDetail.css';
import ShoppingBasket from "./ShoppingBasket";
import axios from "axios";

// 디테일
const GoodsDetail = ({ loginMember, userBasketItem, checkLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const good = location.state.good;


  //샵으로 돌아가기
  const returnToGoodsShop = () => {
    navigate("/");
  };

  
  // 선택한 사이즈
  const [selectSize, setSelectSize] = useState(good.goodsSize.split(",")[0]);

  // 사이즈 선택
  const handleSizeChange = (e) => {
    setSelectSize(e.target.value);
  };


  //각 이미지 출력
  const imgSrc1 = `${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`;     //이미지1
  console.log(imgSrc1);
  const imgSrc2 = `${process.env.PUBLIC_URL}/images/goodsImage2/${good.goodsImage2}`;   //이미지2
  console.log(imgSrc2);


  // 장바구니에 추가
  const addToShoppingBasket = () => {
    const basketItem = {
      memberNo: loginMember.memberNo,
      goodsNo: good.goodsNo,
      goodsQuantity: 1,
      basketTotal: good.goodsPrice,
      goodsSize: selectSize
    };

    axios.post('http://localhost:9000/basket/add', basketItem)
      .then(() => {
        alert("장바구니에 추가되었습니다.");
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  };





  
  return (
    <div className="detail-container">
      <h2>{good.goodsName}</h2>
      <hr />
      <img src={imgSrc1} alt={good.goodsImage} />
      <img src={imgSrc2} alt={good.goodsImage2} />

      <div className="detail-text">
        <p>₩ {good.goodsPrice.toLocaleString()}</p>
        <p>{good.goodsDetail}</p>
      </div>


      {/* 사이즈 선택 */}
      <div className="detail-sizeSelect">
        <label htmlFor="size-select">사이즈 선택 : </label>
        <select id="size-select" value={selectSize} onChange={handleSizeChange}>
          {good.goodsSize.split(",").map((size, index) => (
            <option key={index} value={size}> {size} </option>
          ))}
      </select>
      </div>


      <div className="buttons">
        <button className="basketAdd-button" onClick={() => ShoppingBasket(good, loginMember, userBasketItem, checkLogin)}>장바구니에 추가</button>
        <button className="back-button" onClick={returnToGoodsShop} >샵으로 돌아가기</button>
      </div>
    </div>
  );
};

export default GoodsDetail;