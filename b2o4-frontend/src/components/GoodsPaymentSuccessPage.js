import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyPageContext from "./MyPageContext";

export function GoodsPaymentSuccessPage() {
  const { loginMember, basketList, setBasketList } = useContext(MyPageContext);
  const [orderId, setOrderId] = useState(null);
  const [paymentKey, setPaymentKey] = useState(null);
  const [amount, setAmount] = useState(null);
  const [basketNos, setBasketNos] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const storedPaymentInfo = JSON.parse(sessionStorage.getItem("paymentInfo"));
    if (storedPaymentInfo) {
      setOrderId(storedPaymentInfo.orderId);
      setPaymentKey(storedPaymentInfo.paymentKey);
      setAmount(Number(storedPaymentInfo.totalAmount));
      setBasketNos(storedPaymentInfo.basketNos);
    } else {
      console.error("결제 정보가 존재하지 않습니다.");
      setError("결제 정보가 존재하지 않습니다.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (orderId && paymentKey && amount && basketNos.length > 0 && loginMember) {
      saveOrderDetails({
        deliveryAddress: "deliveryAddress",
        recipientName: "recipientName",
        recipientPhone: "recipientPhone",
        deliveryRequest: "deliveryRequest"
      });
    }
  }, [orderId, paymentKey, amount, basketNos, loginMember]);

  const saveOrderDetails = async (paymentInfo) => {
    try {
      const orderData = {
        memberNo: loginMember.memberNo,
        basketNos: basketList.map((item) => item.basketNo), 
        deliveryAddress: paymentInfo.deliveryAddress,
        recipientName: paymentInfo.recipientName,
        recipientPhone: paymentInfo.recipientPhone,
        deliveryRequest: paymentInfo.deliveryRequest,
      };

      const response = await axios.post("http://localhost:9000/delivery/add", orderData);
      console.log("주문 정보가 저장되었습니다.");
      setResponseData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("주문 정보 저장 중 오류 발생:", error.response?.data || error.message);
      setError("주문 정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>오류: {
      error}</div>;
    }
  
    return (
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="Success"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {amount !== null ? `${Number(amount).toLocaleString()}원` : '정보를 불러오는 중입니다...'}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {orderId || '정보를 불러오는 중입니다...'}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>Payment Key</b>
          </div>
          <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
            {paymentKey || '정보를 불러오는 중입니다...'}
          </div>
        </div>
        <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
          <b>Response Data :</b>
          <div id="response" style={{ whiteSpace: "initial" }}>
            {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
          </div>
        </div>
      </div>
    );
  }
  
  export default GoodsPaymentSuccessPage;
  