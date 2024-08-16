import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/ReservationStadium.css';

const ReservationStadium = () => {
  const [personCount, setPersonCount] = useState(1); 
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [stadiumCapacity, setStadiumCapacity] = useState(1); // 기본값
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [stadiums, setStadiums] = useState([]);
  const stadium = location.state?.stadium;

  useEffect(() => {
    if (!stadium) {
      setError('구장 데이터가 없습니다. 홈 페이지로 돌아갑니다...');
      setTimeout(() => navigate('/'), 3000); // 3초 후에 홈으로 리디렉션
      return;
    }
    fetchStadiumDetails();
  }, [stadium, navigate]);

  // 구장 세부 정보를 가져오는 함수
  const fetchStadiumDetails = async() => {
    try {
      const res = await axios.get(`http://localhost:9000/stadiums/stadiumDetail/${stadium.stadiumNo}`);
      setStadiums(res.data);

      if (res.data && res.data.stadiumCapacity) {
        setStadiumCapacity(res.data.stadiumCapacity);
      }
    } catch (err) {
      console.error('구장 세부 정보를 가져오는 중 오류 발생:', err);
      setError('구장 세부 정보를 로드하지 못했습니다.');
    }
  };

  // 날짜 설정 함수
  useEffect(() => {
    const getKSTDateString = (date) => {
      const offset = 9 * 60;
      const kstDate = new Date(date.getTime() + offset * 60 * 1000);
      return kstDate.toISOString().split("T")[0];
    };

    const today = new Date();
    const min = getKSTDateString(today);

    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const max = getKSTDateString(twoWeeksLater);

    setMinDate(min);
    setMaxDate(max);
  }, []);

  // 인원수 변경 핸들러
  const handlePersonCountChange = (event) => {
    setPersonCount(parseInt(event.target.value));
  };

  // 예약 날짜 변경 핸들러
  const handleDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  // 예약 시간 변경 핸들러
  const handleTimeChange = (event) => {
    setReservationTime(event.target.value);
  };

  // 총액 계산 함수
  const calculateTotalPrice = () => {
    return stadium.stadiumPrice * personCount;
  };

  // 결제 핸들러
  const handlePayment = () => {
    navigate('/payment/checkout');
    
  };

  // 에러가 있을 경우 에러 메시지 출력
  if (error) {
    return <div>{error}</div>;
  }

  // 구장 데이터가 없을 경우 로딩 메시지 출력
  if (!stadium) {
    return <div>로딩 중...</div>;
  }

  const handleBackClick = () => {
    navigate("/StadiumList");
  };

  console.log("예약날짜", reservationDate); // 날짜 정보 잘 들어오나 확인용

  return (
    <div className="stadium-reservation-container">
      <button onClick={handleBackClick} className="go-stadiumList-button-res">돌아가기</button>
      <div className="stadium-reservation-div">
        <td className="reservation-stadium-name"><span id="stadiumName">{stadium.stadiumName}({stadium.stadiumLocation})</span></td>
        <input
          type="date"
          className="reservationDate"
          name="closingDate"
          min={minDate}
          max={maxDate}
          value={reservationDate}
          onChange={handleDateChange}
        />
        &nbsp; &nbsp; &nbsp;
        <select className="reservationTime" value={reservationTime} onChange={handleTimeChange}>
          <option>예약 시간</option>
          <option value="1">06:00 ~ 08:00</option>
          <option value="2">08:00 ~ 10:00</option>
          <option value="3">10:00 ~ 12:00</option>
          <option value="4">12:00 ~ 14:00</option>
          <option value="5">14:00 ~ 16:00</option>
          <option value="6">16:00 ~ 18:00</option>
          <option value="7">18:00 ~ 20:00</option>
          <option value="8">20:00 ~ 22:00</option>
          <option value="9">22:00 ~ 00:00</option>
          <option value="10">00:00 ~ 02:00</option>
        </select>
        &nbsp; &nbsp; &nbsp;
        <select className="reservationPersonCount" value={personCount} onChange={handlePersonCountChange}>
          {[...Array(stadiumCapacity).keys()].map(i => (
            <option key={i+1} value={i+1}>{i+1}명</option>
          ))}
        </select>
        <tr>
          <td className="reservation-stadium-total-price">총액 : <span id="totalPrice">{calculateTotalPrice().toLocaleString()}</span></td>
        </tr>
        <button className="reservation-button" onClick={handlePayment} state={{stadium: stadium}}>결제하기</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      
    </div>
  );
};

export default ReservationStadium;
