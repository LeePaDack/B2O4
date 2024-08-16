import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./css/ShoppingBasket.css";
import { useNavigate } from "react-router-dom";
import MyPageContext from "./MyPageContext";


// 장바구니 컴포넌트
const ShoppingBasket = () => {
  const { loginMember, basketList, setBasketList } = useContext(MyPageContext); // join을 goodsNo로 해야할지, 지금 이상태에서 useContext로 상품 리스트를 불러와서 상품정보를 가져올지?
  const [basketGoods, setBasketGoods] = useState([]);
  const navigate = useNavigate();

  console.log("loginMember", loginMember);

  

  // 장바구니 항목 가져오기
  useEffect(() => {
    if (loginMember) {
      axios.get(`http://localhost:9000/basket/all/${loginMember.memberNo}`)
        .then((response) => {
          console.log("RRRRRRRRRRRRRRRREspose ");
          console.log(response);
          setBasketGoods( response.data.filter(
              (good) => good.memberNo === loginMember.memberNo
            )
          );
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
  }, [loginMember, basketList]);
  console.log("basketGoods", basketGoods);

/* 쓰레기들
useEffect(() => {
    if (loginMember) {
        axios.get(`http://localhost:9000/basket/all/${loginMember.memberNo}`)
            .then((response) => {
                setBasketGoods(response.data);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }
}, [loginMember]); */
  
  /*
    useEffect(() => {
        axios.get('http://localhost:9000/basket/all/',  {
            params: {memberNo: memberNo}
        })
        .then(response => {
            setBasketGoods(response.data);
        })
        .catch(err => {
            console.log("Error", err);
        });
    }, [memberNo]);
*/



  // 수량변경 핸들러
  const handleQuantityChange = (basketNo, newQuantity) => {
    const updatedGoods = basketGoods.map((good) =>
      good.basketNo === basketNo ? { ...good, goodsQuantity: newQuantity } : good
    );
    setBasketGoods(updatedGoods);
  };



  // 장바구니 수량변경
  const updateQuantity = (basketNo, newQuantity) => {
    axios.put(`http://localhost:9000/basket/update`, {
      basketNo,
      goodsQuantity: newQuantity,
    })
    .then(() => {
      alert("수량 변경되었습니다.");
    })
    .catch((error) => {
      alert("관리자에게 문의하세요", error);
    });
  };

  // 장바구니 항목 삭제
  const handleDelete = (basketNo) => {
    axios.delete(`http://localhost:9000/basket/delete/${basketNo}`)
      .then(() => {
        setBasketGoods(
          basketGoods.filter((good) => good.basketNo !== basketNo)
        );
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };


  //샵으로 돌아가기
  const returnToGoodsShop = () => {
    navigate("/goodsShop")
  }





  return (
    <div className="basket-container">
      <h2>장바구니</h2>
      <hr />
      <button className="back-button" onClick={returnToGoodsShop}>샵으로 돌아가기</button>
      <table className="basket-table">
        <caption><button className="payment-button" onClick={"/tosspay"}>결제하기</button></caption>
        <thead>
          <tr>
            <th>상품 이미지</th>
            <th>상품 정보</th>
            <th>결제 / 수량변경</th>
          </tr>
        </thead>

        <tbody>
          {basketGoods.length > 0 ? (
            basketGoods.map((good) => (
              <tr key={good.basketNo}>
                <td>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`}
                    alt={good.goodsImage}
                  />
                </td>
                <td>
                  <div className="good-detail">
                    <h3>{good.goodsName}</h3>
                    <p>사이즈: {good.goodsSize}</p>
                    <p>가격: ₩{good.goodsPrice.toLocaleString()}</p>
                    {/*<p>수량: {good.goodsQuantity}</p>  수량변경을 해야 한다... input type=number?? */}
                    <p>수량 :
                      <input type="number" min={1} max={9}
                      value={good.goodsQuantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        handleQuantityChange(good.basketNo, newQuantity); 
                        updateQuantity(good.basketNo, newQuantity);
                      }} />
                      </p>
                  </div>
                </td>
                <td>
                  <p>합계: ₩{good.basketTotal.toLocaleString()}</p>
                  <button className="delete-button" onClick={() => handleDelete(good.basketNo)}>삭제</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">장바구니가 비어 있습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingBasket;