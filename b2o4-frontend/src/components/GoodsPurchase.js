import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageContext from "./MyPageContext";
import axios from "axios";

const GoodsPurchase = () => {

    //memberName, memberAddress, memberPhone

    const { loginMember, basketList, setBasketList  } = useContext(MyPageContext);
    const navigate = useNavigate();
    console.log("난 실패작이야" , basketList);

    const [newAddress, setNewAddress] = useState('');


    useEffect(() => {
        if(loginMember && loginMember.memberAddress) {
            setNewAddress(loginMember.memberAddress);
        }
    }, [loginMember]);

    //로그인멤버의 장바구니 불러오기
    useEffect(() => {
        if(loginMember && loginMember.memberNo) {
            axios.get(`http://localhost:9000/basket/all/${loginMember.memberNo}`)
            .then((response) => {
                setBasketList(response.data);
                console.log("response.data : " , response.data);
                const filterBasketList = response.data.filter(item => item.goodsQuantity > 0);
                setBasketList(filterBasketList);
            })
            .catch((error) => {
                alert("일시적인 오류입니다. 관리자에게 문의하세요" + error);
            })
        }
    }, [loginMember, setBasketList])
    console.log("BRRRRRRRRRRRRRRRRRRRRRRRR")

/*
    const handlePayment = () => {
        //결제부분 코드
        navigate("/토스결제페이지");
    }
*/


    // 결제 총액 계산
    const totalAmount = basketList.reduce((total, item) => {
        return total + (item.goodsQuantity * item.goodsPrice);
    }, 0);




    //새로고침해도 페이지 유지
    if(!loginMember) {
        return "";
    }

    return (
        <div className="purchase-container">
            <h2>결제 회원 정보</h2>
            <div className="purchase-info">
                <ul>
                <li><strong>회원 ID:</strong> {loginMember ? loginMember.memberId : "정보 없음"}</li>
                <li><strong>회원 이름:</strong> {loginMember.memberName ? loginMember.memberName : "정보 없음"}</li>
                <li><strong>배송지 주소:</strong> {loginMember.memberAddress ? loginMember.memberAddress : "주소 정보를 불러오는 중입니다."}</li>
                    <input type="text" value={newAddress} onChange={ (e) => setNewAddress(e.target.value)} ></input>
                <li><strong>연락처:</strong> {loginMember.memberPhone ? loginMember.memberPhone : "정보 없음"}</li>
                </ul>
                {/* map for each */}
               {basketList && basketList.length > 0 ? (
                <div>
                    <h3>주문서</h3>
                    <ul>
                        {basketList.map((item) => (
                            <li key={item.basketNo}>
                                <p><strong>상품명 : {item.goodsName}</strong></p>
                                <p><strong>사이즈 : {item.goodsSize}</strong></p>
                                <p><strong>상품개수 : {item.goodsQuantity}</strong></p>
                                <p><strong>총액 : {item.basketTotal.toLocaleString()} 원</strong></p>
                            </li>
                        ))}
                    </ul>
                    </div>
               ) : (
                <p> 장바구니에 상품이 없습니다. </p>
               )}
            </div>
            <p><strong>결제 총액: {totalAmount.toLocaleString()} 원</strong></p>
            <button className="payment-button" >
                결제하기
            </button>
        </div>
    );
};

export default GoodsPurchase;
