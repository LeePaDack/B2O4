// React 컴포넌트에서 결제 내역을 가져오는 예시
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyPageContext from './MyPageContext';  // loginMember를 제공하는 Context

const PaymentHistory = () => {
  const { loginMember } = useContext(MyPageContext);  // 로그인한 사용자 정보 가져오기
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (loginMember && loginMember.memberNo) {  // loginMember가 존재하는 경우에만 API 호출
      axios.get(`/api/payments/user/${loginMember.memberNo}`)
        .then(response => {
          setReservations(response.data);
          
        })
        .catch(error => {
          console.error('결제 내역을 불러오는 중 오류가 발생했습니다:', error);
        });
    }
  }, [loginMember]);

  return (
    <div>
      <h2>결제 내역</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.reservationNo}>
              <strong>금액 : {reservation.reservationTotal} 원</strong><br />
              <strong>예약 일시 : {new Date(reservation.reservationDate).toLocaleDateString()}</strong> <br />
              <strong>경기 예정 일자: {new Date(reservation.matchDate).toLocaleDateString()}</strong> <br />
              <strong>경기 예약 시간 : {reservation.matchTime}</strong> <br />
              <strong>인원수 : {reservation.reserveCount} 명</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>결제 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
