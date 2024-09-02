import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageContext from "./MyPageContext";
import axios from "axios";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import "./css/DeliveryInfo.css";

const clientKey = "test_ck_AQ92ymxN34YkyXwdXe2PVajRKXvd";
const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);

const GoodsPaymentDeliveryInfo = () => {
  const { loginMember, basketList, setBasketList } = useContext(MyPageContext);
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryRequest, setDeliveryRequest] = useState("");

  useEffect(() => {
    if (loginMember) {
      setDeliveryAddress(loginMember.memberAddress || "");
      setRecipientName(loginMember.memberName || "");
      setRecipientPhone(loginMember.memberPhone || "");
    }
  }, [loginMember]);

  useEffect(() => {
    if (loginMember && loginMember.memberNo) {
      axios.get(`http://localhost:9000/basket/all/${loginMember.memberNo}`)
        .then(response => {
          const filterBasketList = response.data.filter(item => item.goodsQuantity > 0);
          setBasketList(filterBasketList);
        })
        .catch(error => {
          alert("일시적인 오류가 발생했습니다. 관리자에게 문의하세요: " + error.message);
        });
    }
  }, [loginMember, setBasketList]);

  const totalAmount = basketList.reduce((total, item) => total + item.goodsQuantity * item.goodsPrice, 0);

  const handlePayment = async () => {
    try {
      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({ customerKey: generateRandomString() });

      const orderId = generateRandomString();
      const response = await payment.requestPayment({
        method: "CARD", // 결제 방법 선택
        amount: {
          currency: "KRW",
          value: totalAmount,
        },
        orderId,
        orderName: `상품 주문 (${basketList.length}개 상품)`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: loginMember.memberEmail,
        customerName: loginMember.memberName,
        customerMobilePhone: loginMember.memberPhone,
      });

      // 장바구니 번호 배열 생성
      const basketNos = basketList.map(item => item.basketNo);

      // 결제 정보 저장
      sessionStorage.setItem('paymentInfo', JSON.stringify({
        orderId,
        paymentKey: response.paymentKey,
        totalAmount,
        deliveryAddress,
        recipientName,
        recipientPhone,
        deliveryRequest,
        basketNos, // 장바구니 번호 배열 저장
      }));

      navigate('/payment/checkout');
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다:", error);
      alert("결제 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="purchase-container">
      <h2>주문 정보 입력</h2>
      <div className="form-group">
        <label>배송 주소</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="배송 주소를 입력하세요"
        />
      </div>
      <div className="form-group">
        <label>받는 분 이름</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="받는 분의 이름을 입력하세요"
        />
      </div>
      <div className="form-group">
        <label>받는 분 전화번호</label>
        <input
          type="text"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          placeholder="받는 분의 전화번호를 입력하세요"
        />
      </div>
      <div className="form-group">
        <label>배송 요청 사항</label>
        <textarea
          value={deliveryRequest}
          onChange={(e) => setDeliveryRequest(e.target.value)}
          placeholder="배송 요청 사항을 입력하세요"
        />
      </div>
      <button className="payment-button" onClick={handlePayment}>
        결제하기
      </button>
    </div>
  );
};

export default GoodsPaymentDeliveryInfo;
