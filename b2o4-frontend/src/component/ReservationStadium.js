import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReservationStadium = () => {
  const [personCount, setPersonCount] = useState(1); 
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [stadiumCapacity, setStadiumCapacity] = useState(1); // Default value

  const location = useLocation();
  const [stadiums, setStadiums] = useState([]);
  const stadium = location.state.stadium;
  
  console.log("location",location);

  useEffect(() => {
      StadiumReservationList();
  }, []);

  const StadiumReservationList = async() => {
      const res = await axios.get(`http://localhost:9000/stadiums/stadiumDetail/${stadium.stadiumNo}`);
      setStadiums(res.data);

      if (res.data && res.data.stadiumCapacity) {
        setStadiumCapacity(res.data.stadiumCapacity);
      }
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
        {[...Array(stadiumCapacity).keys()].map(i => (
          <option key={i+1} value={i+1}>{i+1}명</option>
        ))}
      </select>
      <tr>
        <td>구장이름<span id="stadiumName">{stadium.stadiumName}</span></td>
        <td>총액 : <span id="totalPrice">{calculateTotalPrice().toLocaleString()}</span></td>
      </tr>
      <button type="button">결제하기</button>
    </div>
  );
};

export default ReservationStadium;
