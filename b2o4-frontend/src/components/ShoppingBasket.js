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

/*
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



  // 장바구니 항목 삭제
  const handleDelete = (basketNo) => {
    axios
      .delete(`http://localhost:9000/basket/delete/${basketNo}`)
      .then(() => {
        setBasketGoods(
          basketGoods.filter((good) => good.basketNo !== basketNo)
        );
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };





  return (
    <div className="basket-container">
      <h2>장바구니</h2>
      {basketGoods.length > 0 ? (
        <ul>
          {basketGoods.map((good) => (
            <li key={good.basketNo}>
              <img
                src={`${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`}
                alt={good.goodsImage}
              />
              <div className="good-detail">
                <h3>{good.goodsName}</h3>
                <p>사이즈: {good.goodsSize}</p>
                <p>가격: ₩{good.goodsPrice.toLocaleString()}</p>
                <p>수량: {good.goodsQuantity}</p>
                <p>합계: ₩{good.basketTotal.toLocaleString()}</p>
                <button onClick={() => handleDelete(good.basketNo)}> 삭제 </button>
                
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>장바구니가 비어 있습니다.</p>
      )}
    </div>
  );
};

export default ShoppingBasket;
