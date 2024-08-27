import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/PaymentCheckoutPage.css';
import MyPageContext from "../MyPageContext";

const clientKey = "test_ck_AQ92ymxN34YkyXwdXe2PVajRKXvd";

const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const customerKey = generateRandomString();

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { loginMember } = useContext(MyPageContext);
  console.log("!!!!!!!로그인정보 : " , loginMember)
  const { stadium, personCount, reservationDate, reservationTime, totalPrice } = location.state;
  console.log("!!!!!!totalPrice", totalPrice);
  console.log("location.state", location.state);
  sessionStorage.setItem('paymentInfo', JSON.stringify(location.state));
  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    }

    fetchPayment();
  }, []);

  const requestPayment = async () => {
    try {
      console.log("window.location", window.location)
      const orderId = generateRandomString();

      const response = await payment.requestPayment({
        method: selectedPaymentMethod,
        amount: {
          currency: "KRW",
          value: totalPrice,
        },
        orderId,
        orderName: `${stadium.stadiumName} 예약 (${reservationDate}, ${reservationTime} 시간대, ${personCount}명)`,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: loginMember.memberEmail,
        customerName: loginMember.memberName,
        customerMobilePhone: loginMember.memberPhone,
      });

      console.log(response);
      
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <h1>일반 결제</h1>
        <div id="payment-method">
          {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE", "CULTURE_GIFT_CERTIFICATE", "FOREIGN_EASY_PAY"].map((method) => (
            <button
              key={method}
              id={method}
              className={`button2 ${selectedPaymentMethod === method ? "active" : ""}`}
              onClick={() => selectPaymentMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>
        <button className="button" onClick={requestPayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default PaymentCheckoutPage;
