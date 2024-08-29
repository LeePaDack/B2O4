import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import MyPageContext from "../MyPageContext";

export function PaymentSuccessPage() {
  const { loginMember } = useContext(MyPageContext);
  const [orderId, setOrderId] = useState(null);
  const [paymentKey, setPaymentKey] = useState(null);
  const [amount, setAmount] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRequested, setHasRequested] = useState(false);

  // 새로고침 방지 및 경고 메시지 처리
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // 이 줄은 일부 브라우저에서 경고 메시지가 나타나게 합니다.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const urlOrderId = searchParams.get("orderId");
    const urlPaymentKey = searchParams.get("paymentKey");
    const urlAmount = searchParams.get("amount");

    if (urlOrderId && urlPaymentKey && urlAmount) {
      setOrderId(urlOrderId);
      setPaymentKey(urlPaymentKey);
      setAmount(Number(urlAmount));
    } else {
      const storedPaymentInfo = JSON.parse(
        sessionStorage.getItem("paymentInfo")
      );
      if (storedPaymentInfo) {
        setOrderId(storedPaymentInfo.orderId);
        setPaymentKey(storedPaymentInfo.paymentKey);
        setAmount(Number(storedPaymentInfo.totalPrice));
      } else {
        console.error("No paymentInfo found in sessionStorage or URL.");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      !hasRequested &&
      loginMember !== null &&
      orderId &&
      paymentKey &&
      amount
    ) {
      confirmPayment();
    }
  }, [loginMember, orderId, paymentKey, amount, hasRequested]);

  async function confirmPayment() {
    setHasRequested(true);
    const requestData = {
      orderId,
      amount,
      paymentKey,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/confirm/payment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const storedPaymentInfo = JSON.parse(
          sessionStorage.getItem("paymentInfo")
        );
        if (storedPaymentInfo) {
          const reservationData = {
            memberNo: loginMember.memberNo,
            stadiumNo: storedPaymentInfo.stadium.stadiumNo,
            reservationTotal: storedPaymentInfo.totalPrice,
            matchDate: storedPaymentInfo.reservationDate,
            matchTime: storedPaymentInfo.reservationTime,
            reserveCount: storedPaymentInfo.personCount,
          };

          await axios.post(
            "http://localhost:9000/reservationStadium",
            reservationData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Reservation data saved successfully:", reservationData);
        }
      }
    } catch (error) {
      console.error("Error during payment confirmation or reservation:", error);
      navigate(`/fail?code=${error.code}&message=${error.message}`, {
        replace: true,
      });
    }
  }

  // 3초 후에 메인 페이지로 리다이렉트
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 클리어하여 메모리 누수를 방지
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!loginMember || !orderId || !paymentKey || !amount) {
    return <div>정보를 불러오는 중입니다...</div>;
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
        <div
          className="p-grid-col text--right"
          id="paymentKey"
          style={{ whiteSpace: "initial", width: "250px" }}
        >
          {paymentKey}
        </div>
      </div>
      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;