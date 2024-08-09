import React, {useState} from "react";
import axios from "axios";

const addShoppingBasket = (item, loginMember, userCartItem, checkLogin) => {
  const cartObj = {
    itemNo: item.itemNo,
    memberNo: loginMember.memberNo,
    shoppingCount: 1,
    shoppingPrice: item.itemPrice,
  };

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
};

export default addShoppingBasket;
