import React, { useState } from "react";

const addShoppingBasket = () => {
    
    const [addGoods, setAddGoods] = useState([]);
    

    return (
        <>

        </>
    )
}


// 장바구니 추가
const addcart = (item) => {
    const cartObj = {};
    cartObj.itemNo = item.itemNo;
    cartObj.memberNo = loginMember.memberNo;
    cartObj.shoppingCount = 1;
    cartObj.shoppingPrice = item.itemPrice;
    console.log("userCartItem : ", userCartItem);
    if(checkLogin()) { // 로그인 되어있다면
        let isItem = false;
        for (let i = 0; i < userCartItem.length; i++) {
            if (userCartItem[i].itemNo == item.itemNo) {
                isItem = true;
                break;
            }
        }
        // 로그인 멤버의 카트 정보 가져와 기존에 장바구니에 담겨있는 아이템일경우 -> 수량을 업데이트 시킨다
        if (isItem) {
        } else { // 장바구니에 해당아이템이 없을 경우 등록한다
            axios.post("/addcart", cartObj, {
                headers: {
                "Content-Type": "application/json", // json 데이터를 전송할 때 Content-Type 은 application/json 형태
                }
            })
            .then(() => {
                alert("장바구니에 추가되었습니다."); // DB에 성공적으로 추가
            })
            .catch(error => {
                console.error("장바구니 추가 실패:", error);
            });
        }
    }
}

export default addShoppingBasket;
