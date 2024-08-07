import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReservationStadium = () => {

  const [personCount, setPersonCount] = useState(1); 

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const location = useLocation();
  const [stadiums, setStadiums] = useState([]);
  const stadium = location.state.stadium;
  
  console.log("location",location);

  useEffect(() => {
      StadiumReservationList();
  }, []);

  const StadiumReservationList = async() => {
      const res = await axios.get('/stadiums');
      setStadiums(res.data);
  };

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


  const handlePersonCountChange = (event) => {
    setPersonCount(parseInt(event.target.value));
  };

  const calculateTotalPrice = () => {
    return stadium.stadiumPrice * personCount;
  };
  return (
    <div>
      <h6>예매하기</h6>
      <input
        type="date"
        className="reservationDate"
        name="closingDate"
        min={minDate}
        max={maxDate}
      />
      &nbsp; &nbsp; &nbsp;
      <select name="reservationTime">
        <option>예약 시간</option>
        <option>06:00 ~ 08:00</option>
        <option>08:00 ~ 10:00</option>
        <option>10:00 ~ 12:00</option>
        <option>12:00 ~ 14:00</option>
        <option>14:00 ~ 16:00</option>
        <option>16:00 ~ 18:00</option>
        <option>18:00 ~ 20:00</option>
        <option>20:00 ~ 22:00</option>
        <option>22:00 ~ 00:00</option>
        <option>00:00 ~ 02:00</option>
      </select>
      &nbsp; &nbsp; &nbsp;
      <select value={personCount} onChange={handlePersonCountChange}> 

        <option value="0">인원수{/*{구장 수용인원 DB 에서 가져오기}*/}</option>
        <option value="1">1명</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option>...</option>
      </select>
      <tr>
        <td>구장이름<span id="stadiumName">{stadium.stadiumName}</span></td>
        <td>총액 : <span id="totalPrice">{calculateTotalPrice().toLocaleString()}</span></td>
        </tr>
        <button type="button">결제하기</button> {/* toss 로 넘어가는 루트 만들어야함 */}
    </div>
    
  );
};

export default ReservationStadium;
