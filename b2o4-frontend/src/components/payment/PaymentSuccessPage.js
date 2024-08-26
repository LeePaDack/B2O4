import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import MyPageContext from "../MyPageContext";

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const { loginMember } = useContext(MyPageContext);
  const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'));

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      try {
        // 결제 확인 요청
        const response = await axios.post("http://localhost:9000/confirm/payment", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          throw { message: response.data.message, code: response.data.code };
        }

        // 결제 성공 시 예약 정보를 서버로 전송
        const reservationData = {
          memberNo: loginMember.memberNo,
          stadiumNo: paymentInfo.stadium.stadiumNo,
          reservationTotal: paymentInfo.totalPrice,
          matchDate: paymentInfo.reservationDate,
          matchTime: paymentInfo.reservationTime,
          reserveCount: paymentInfo.personCount,
        };

        await axios.post("http://localhost:9000/reservationStadium", reservationData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setResponseData(response.data); // 응답 데이터 저장
        // 성공 화면으로 리다이렉트
        navigate(`/payment/success`, { replace: true });
      } catch (error) {
        console.error("결제 확인 및 예약 처리 중 오류 발생:", error);
        navigate(`/fail?code=${error.code}&message=${error.message}`, { replace: true });
      }
    }

    confirm();
  }, [searchParams, loginMember, navigate]);

  return (
    <div className="box_section" style={{ width: "600px" }}>
      <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
      <h2>결제를 완료했어요</h2>
      <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
        <div className="p-grid-col text--left">
          <b>결제금액</b>
        </div>
        <div className="p-grid-col text--right" id="amount">
          {`${Number(searchParams.get("amount")).toLocaleString()}원`}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>주문번호</b>
        </div>
        <div className="p-grid-col text--right" id="orderId">
          {`${searchParams.get("orderId")}`}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>paymentKey</b>
        </div>
        <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
          {`${searchParams.get("paymentKey")}`}
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