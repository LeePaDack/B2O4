import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import MyPageContext from "../MyPageContext";

export function PaymentSuccessPage() {
  const { loginMember } = useContext(MyPageContext); // 로그인 정보 컨텍스트 가져오기
  const [paymentInfo, setPaymentInfo] = useState(null); // 결제 정보 상태
  const [isReady, setIsReady] = useState(false); // loginMember와 paymentInfo가 로드되었는지 확인하는 상태
  const [orderId, setOrderId] = useState(null); // orderId 상태 추가
  const [paymentKey, setPaymentKey] = useState(null); // paymentKey 상태 추가
  const [amount, setAmount] = useState(null); // amount 상태 추가
  const [searchParams] = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const [responseData, setResponseData] = useState(null); // 응답 데이터 상태
  const navigate = useNavigate();

  console.log("11 loginMember : ", loginMember);
  console.log("11 paymentInfo : ", paymentInfo);

  // 세션 저장소에서 결제 정보 로드
  useEffect(() => {
    const storedPaymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'));
    setPaymentInfo(storedPaymentInfo);
  }, []);

  // loginMember와 paymentInfo가 모두 로드될 때까지 대기
  useEffect(() => {
    if (loginMember !== null && paymentInfo !== null) {
      setIsReady(true); // 두 정보가 모두 로드되면 로딩 완료
    }
  }, [loginMember, paymentInfo]);

  // loginMember와 paymentInfo가 모두 로드되면 confirmPayment 실행
  useEffect(() => {
    if (isReady) {
      confirmPayment(); // 결제 확인 함수 호출
    }
  }, [isReady]); // isReady 상태가 true가 될 때 실행

  async function confirmPayment() {
    const calculatedOrderId = searchParams.get("orderId") || paymentInfo?.orderId || generateOrderId(); // orderId 생성 또는 로드
    const calculatedPaymentKey = searchParams.get("paymentKey") || paymentInfo?.paymentKey;
    const calculatedAmount = searchParams.get("amount") || paymentInfo?.totalPrice;

    // 상태에 저장하여 JSX에서 사용
    setOrderId(calculatedOrderId);
    setPaymentKey(calculatedPaymentKey);
    setAmount(calculatedAmount);

    // 결제 정보를 sessionStorage에 저장 (다음 단계에서 활용하기 위해)
    sessionStorage.setItem('paymentInfo', JSON.stringify({ ...paymentInfo, orderId: calculatedOrderId, paymentKey: calculatedPaymentKey, totalPrice: calculatedAmount }));

    const requestData = {
      orderId: calculatedOrderId,
      amount: calculatedAmount,
      paymentKey: calculatedPaymentKey,
    };

    try {
      console.log("1. entity : ", requestData);
      const response = await axios.post("http://localhost:9000/confirm/payment", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("2. response : ", response);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      const reservationData = {
        memberNo: loginMember.memberNo,
        stadiumNo: paymentInfo?.stadium?.stadiumNo,
        reservationTotal: paymentInfo?.totalPrice,
        matchDate: paymentInfo?.reservationDate,
        matchTime: paymentInfo?.reservationTime,
        reserveCount: paymentInfo?.personCount,
      };

      if (!reservationData.stadiumNo) {
        throw new Error("Stadium information is missing.");
      }

      await axios.post("http://localhost:9000/reservationStadium", reservationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponseData(response.data); // 응답 데이터 저장
      navigate(`/payment/success`, { replace: true }); // 성공 페이지로 이동
    } catch (error) {
      console.error("결제 확인 및 예약 처리 중 오류 발생:", error);
      navigate(`/fail?code=${error.code}&message=${error.message}`, { replace: true }); // 실패 페이지로 이동
    }
  }

  // 랜덤 orderId를 생성하는 함수
  function generateOrderId() {
    return `ORD-${Math.random().toString(36).substr(2, 9)}`;
  }

  if (!loginMember || !paymentInfo || !orderId || !paymentKey || !amount) {
    return <div>정보를 불러오는 중입니다...</div>; // 로딩 상태 표시
  }

  return (
    <div className="box_section" style={{ width: "600px" }}>
      <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
      <h2>결제를 완료했어요</h2>
      <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
        <div className="p-grid-col text--left">
          <b>결제금액</b>
        </div>
        <div className="p-grid-col text--right" id="amount">
          {`${Number(amount).toLocaleString()}원`}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>주문번호</b>
        </div>
        <div className="p-grid-col text--right" id="orderId">
          {orderId}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>paymentKey</b>
        </div>
        <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
          {paymentKey}
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

export default PaymentSuccessPage;