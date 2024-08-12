import React, {useState} from "react";
import axios from "axios";
import './css/ShoppingBasket.css';
import { useNavigate } from "react-router-dom";

//상품 추가
const addShoppingBasket = (item, loginMember, userCartItem, checkLogin) => {
  const cartObj = {
    itemNo: item.itemNo,
    memberNo: loginMember.memberNo,
    shoppingCount: 1,
    shoppingPrice: item.itemPrice,
  };

  

//멤버별 장바구니
const ShoppingBasket = ({loginMember}) => {
    const [basektItems, setBasketItems] = useState([]);
    const navigate = useNavigate();
}



  if (checkLogin()) {
    const isItemInCart = userCartItem.some(cartItem => cartItem.itemNo === item.itemNo);

    if (!isItemInCart) {
      axios.post("/addcart", cartObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("장바구니에 추가되었습니다.");
      })
      .catch(error => {
        console.error("장바구니 추가 실패:", error);
      });
    }
  }
  
  
    return (
      <div className="basket-container">
        <h2>장바구니</h2>
        {/** 
         {basektItems.length > 0 ? (
            <ul>
                {basektItems.map (good => (
                    <li key={good.basketNo}>
                        <img src={`${process.env.PUBLIC_URL}/images/goodsImage1/${good.goodsImage}`} />
                        <div className="item-detail">
                            <h3>{good.goodsName}</h3>
                            <p>사이즈 : {good.goodsSize}</p>
                            <p>가격: ₩{good.goodsPrice.toLocaleString()}</p>
                            <p>수량: {good.goodsQuantity}</p>
                            <p>합계: ₩{good.basketTotal.toLocaleString()}</p>
                            <button onClick={ () => handleDelete(good.basketNo)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
          ) : (
            <p>장바구니가 비어 있습니다.</p>
          )}
            */}
        </div>
      );
    };




export default addShoppingBasket;
