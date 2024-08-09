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
         
      </div>
    )
};
export default addShoppingBasket;
