import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageContext from "./MyPageContext";
import axios from "axios";
import "./css/DeliveryInfo.css";

const GoodsPurchase = () => {

    //memberName, memberAddress, memberPhone

    const { loginMember, basketList, setBasketList  } = useContext(MyPageContext);
    const navigate = useNavigate();

    

    
    const [deliveryAddress, setdeliveryAddress] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');


    //멤버주소 불러오기 -> 배송지주소
    useEffect(() => {
        if(loginMember && loginMember.memberAddress) {
            setdeliveryAddress(loginMember.memberAddress);
        }
    }, [loginMember]);

    //멤버이름 불러오기 -> 수령인명
    useEffect(() => {
        if(loginMember && loginMember.memberName) {
            setRecipientName(loginMember.memberName);
        }
    }, [loginMember]);

    //멤버핸드폰번호 불러오기 -> 수령인번호
    useEffect(() => {
        if(loginMember && loginMember.memberPhone) {
            setRecipientPhone(loginMember.memberPhone);
        }
    }, [loginMember]);

    //배송요청사항
    const [deliveryRequest, setDeliveryRequset] = useState('');




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



    // 결제 총액 계산
    const totalAmount = basketList.reduce((total, item) => {
        return total + (item.goodsQuantity * item.goodsPrice);
    }, 0);


    // 배송 요청사항 옵션
    const deliveryRequestOptions = [
        "문앞에 놔주세요.",
        "택배함에 넣어주세요.",
        "경비실에 맡겨주세요.",
        "도착 전 연락바랍니다.",
        "직접입력따윈 없다 크킄ㅋ"
    ];


    //새로고침해도 페이지 유지
    if(!loginMember) {
        return "";
    }


    //DeliveryInfo insert
    /*
    const basketItem = {
        memberNo: loginMember.memberNo,
        goodsNo: good.goodsNo,
        goodsQuantity: 1,
        basketTotal: good.goodsPrice,
        goodsSize: selectSize
      };
  
      axios.post('http://localhost:9000/basket/add', basketItem)
        .then(() => {
          if(window.confirm('장바구니에 추가되었습니다. 이동하시겠습니까?')) {
            navigate("/shoppingBasket");
          }
        })
        .catch(err => {
          console.error("Error: ", err);
        });
    };
    */

    
    //최종주문 정보들
    const submitData = {
        memberNo: loginMember.memberNo,
        //basketNo: basketList[0]?.basketNo,
        basketNos: basketList.map(item => item.basketNo), // 장바구니 번호 리스트로 변경
        deliveryAddress: deliveryAddress,
        recipientName: recipientName,
        recipientPhone: recipientPhone,
        deliveryRequest: deliveryRequest,
    };
    
    
    //최종주문
    const finalOrder = () => {

        console.log(submitData);
        axios.post('http://localhost:9000/delivery/add', submitData)
        .then((response) => {
            alert("주문이 완료되었습니다.");
            //navigate("/마이페이지 확인")
        })
        .catch((error) => {
            alert("다시 시도해주세요")
        })
    }
         
        
    


    
/*
    const handlePayment = () => {
        //결제부분 코드
        navigate("/토스결제페이지");
    }
*/


    return (
        <div className="purchase-container">
            <h2>주문정보 입력</h2>
            <div className="purchase-info">
                <ul>
                <li><strong>회원 ID : </strong> {loginMember ? loginMember.memberId : "정보 없음"}</li>

                <li><strong>수령인 이름 : </strong></li>
                    <input type="text" value={recipientName} onChange={ (e) => setRecipientName(e.target.value)}></input>

                <li><strong>배송지 주소 : </strong></li>
                    <input type="text" value={deliveryAddress} onChange={ (e) => setdeliveryAddress(e.target.value)}></input>

                <li><strong>연락처 : </strong></li>
                    <input type="text" value={recipientPhone} onChange={ (e) => setRecipientPhone(e.target.value)}></input>

                <li><strong>배송 요청 사항:</strong></li>
                    <select value={deliveryRequest} onChange={ (e) => setDeliveryRequset(e.target.value)}>
                        <option value="">선택하세요.</option>
                        {deliveryRequestOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                
                </ul>
                {/* 정보만 출력
                <ul>
                <li><strong>회원 ID:</strong> {loginMember ? loginMember.memberId : "정보 없음"}</li>
                <li><strong>수령인 이름:</strong> {loginMember.memberName ? loginMember.memberName : "정보 없음"}</li>
                <li><strong>배송지 주소:</strong> {loginMember.memberAddress ? loginMember.memberAddress : "주소 정보를 불러오는 중입니다."}</li>
                <li><strong>연락처:</strong> {loginMember.memberPhone ? loginMember.memberPhone : "정보 없음"}</li>
                </ul>
                */}



                {/* map for each */}
               {basketList && basketList.length > 0 ? (
                <div>
                    <h3>주문 내역</h3>
                    <ul>
                        {basketList.map((item) => (
                            <li key={item.basketNo} className="each-goods">
                                <p><strong>상품명 : {item.goodsName}</strong></p>
                                <p><strong>사이즈 : {item.goodsSize}</strong></p>
                                <p><strong>상품개수 : {item.goodsQuantity}</strong></p>
                                <p><strong>총액 : {item.basketTotal.toLocaleString()} 원</strong></p>
                            </li>
                        ))}
                    </ul>
                    </div>
               ) : (
                <p> 주문정보가 없습니다. </p>
               )}
            </div>
            <div className="payment-fianl">
            <p><strong>결제 총액: {totalAmount.toLocaleString()} 원</strong></p>
            <button className="payment-button" onClick={finalOrder}>결제하기</button>
            </div>
        </div>
    );
};

export default GoodsPurchase;
