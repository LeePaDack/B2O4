import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/FindLogin.css";
import axios from "axios";

const FindId = () => {
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");

  const [findResultId, setFindResultId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const findResult = () => {
    if (!memberName || !memberPhone) {
      alert("모두 입력해주세요!");
      return;
    }

    axios
      .post(
        "/findId",
        {
          memberName: memberName,
          memberPhone: memberPhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data) {
          setFindResultId(response.data);
          setErrorMessage("");
          setMemberName('');
          setMemberPhone('');
          console.log("회원정보 : ", response.data);
        } else {
          setFindResultId(null);
          setErrorMessage("일치하는 정보가 없습니다. 다시 입력해주세요");
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
          <h1>아이디 찾기</h1>
        </div>
        <div className="findId">
          <div className="findId-input">
            <div>
              <label>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 름</label>
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
          <div className="findId-buttons">
            <div>
              <button onClick={findResult}>아이디 찾기</button>
            </div>
            <div>
              <Link to="/login">
              <button>로그인</button>
              </Link>
            </div>
          </div>
          <div className="findResult">
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          {findResultId &&
            <div>
             <p>고객님의 아이디는 "{findResultId.memberId}" 입니다.</p>
            </div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindId;
