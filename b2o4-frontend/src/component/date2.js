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
    <input
      type="date" // 날짜 입력 필드로 설정
      className="reservationDate"
      name="closingDate"
      min={minDate} // 선택할 수 있는 최소 날짜 설정
      max={maxDate} // 선택할 수 있는 최대 날짜 설정
    />
  );
};

export default DateInput;