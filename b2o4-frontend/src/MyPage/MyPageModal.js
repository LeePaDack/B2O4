import React, { useContext, useState } from "react";
import axios from "axios";
import MyPageContext from "./MyPageContext";
import '../css/MyPageCss.css';

const MyPageModal = ({ isOpen, onClose, onPasswordCorrect }) => {
  const { loginMember } = useContext(MyPageContext);
  const [password, setPassword] = useState("");

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const passwordCheck = async () => {
    try {
      const response = await axios.post("/api/mypage/check-password", {
        memberId: loginMember.memberId,
        memberPw: password,
      });
      onPasswordCorrect();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        console.error("비밀번호 확인 중 오류가 발생했습니다:", error);
        alert("비밀번호 확인 중 오류가 발생했습니다.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>비밀번호 확인</h2>
        <input
          type="password"
          value={password}
          onChange={inputPassword}
          placeholder="비밀번호를 입력하세요"
          className="password-input"
        />
        <div className="modal-buttons">
          <button onClick={passwordCheck} className="confirm-button">
            확인
          </button>
          <button onClick={onClose} className="cancel-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;
