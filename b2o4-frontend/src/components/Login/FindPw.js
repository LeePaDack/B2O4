import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/FindLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindPw = () => {

  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const findResult = () => {
    if (!memberId || !memberName || !memberPhone) {
      alert("모두 입력해주세요!");
      return;
    }

    axios
      .post(
        "/findPw",
        {
          memberId : memberId,
          memberName: memberName,
          memberPhone: memberPhone
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data) {
          navigate('/pwModify')
          setErrorMessage("");
          console.log("회원정보 : ", response.data);
        } else {
          setErrorMessage("일치하는 정보가 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Error finding ID:", error);
      });
  };

  return (
    <div className="findIdPw-container">
      <div className="find-Id-Pw">
        <Link to="/findId" className="Link-list">
          아이디 찾기
        </Link>
        <Link to="/findPw" className="Link-list">
          비밀번호 찾기
        </Link>
      </div>

      <div className="findId-container">
        <div className="findId-title">
          <h1>비밀번호 찾기</h1>
        </div>
        <div className="findId">
        <div className="findId-input">
            <div>
              <label>아이디</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="아이디를 입력하세요."
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="findId-input">
            <div>
              <label>이름</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="이름을 입력하세요."
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="findId-input">
            <div>
              <label>전화번호</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="전화번호를 입력하세요."
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button onClick={findResult}>비밀번호 찾기</button>
          </div>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPw;
