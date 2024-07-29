import React, { useState, useEffect } from 'react';

// **************************************************** 예약시 날짜 선택하는 코드로 사용될 예정

const DateInput = () => {
  // minDate와 maxDate 상태를 정의
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  
  useEffect(() => {
    // 주어진 날짜를 KST로 변환하여 ISO 형식의 날짜 문자열을 반환하는 함수
    const getKSTDateString = (date) => {
      const offset = 9 * 60; // UTC+9 시간 오프셋 (분 단위로 계산)
      const kstDate = new Date(date.getTime() + offset * 60 * 1000); // 오프셋을 더하여 KST로 변환
      return kstDate.toISOString().split('T')[0]; // ISO 문자열에서 날짜 부분만 반환
    };

    const today = new Date(); // 현재 날짜를 생성
    const min = getKSTDateString(today); // 현재 날짜를 KST로 변환하여 minDate로 설정

    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // 현재 날짜에서 14일을 더한 날짜를 생성
    const max = getKSTDateString(twoWeeksLater); // 2주 후의 날짜를 KST로 변환하여 maxDate로 설정

    setMinDate(min); // minDate 상태를 설정
    setMaxDate(max); // maxDate 상태를 설정
  }, []); // 빈 배열을 의존성 배열로 사용하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h6>사용 예정</h6>
      <input
        type="date" // 날짜 입력 필드로 설정
        className="reservationDate"
        name="closingDate"
        min={minDate} // 선택할 수 있는 최소 날짜 설정
        max={maxDate} // 선택할 수 있는 최대 날짜 설정
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
      <select>
        {/* 
        if else 문? for 문? 
        for(int i = 1; i <= 구장수용인원; i++) {

        }

        <option value="i">i 명</option>


        const [수용인원, set수용인원] = useState([]);
        for(let i = 1; i< 5; i++){
        setPerson([i]) = i;
        }
   
        {person.map(p => {
        <option>{p.}</option>
        })}
        */}
        
        <option>인원수{/*{구장 수용인원 DB 에서 가져오기}*/}</option>
        <option value="1">1명</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option>...</option>
      </select>

      <tr>
        <td>구장이름{/*{구장 이름 DB 에서 가져오기}*/}</td>
        <td>총액{/*{구장 가격 DB 에서 가져온 후 * 인원수}*/}</td>
      </tr>

      <button type='button'>결제하기</button>
    </div>
  );
};

export default DateInput;