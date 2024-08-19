import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/FindLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindPw = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [operationKey, setOperationKey] = useState(false); // true가 되면 비밀번호 수정화면으로 넘어감

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [change, setChange] = useState(false);

  const findResult = async () => {
    if (!memberId || !memberName || !memberPhone) {
      alert("모두 입력해주세요!");
      return;
    }
    try {
      const response = await axios.post(
        "/findPw",
        {
          memberId: memberId,
          memberName: memberName,
          memberPhone: memberPhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data) {
        setUserInfo(response.data);
        alert("회원 정보를 조회하고 있습니다.");
        setErrorMessage("");
        setChange(true);
      } else {
        setErrorMessage("일치하는 정보가 없습니다.");
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("일치하는 정보가 없습니다.");
    }
  };

  // 유저가 입력한 이메일로 인증 코드를 보내기 위해 컨트롤러로 사용자 이메일을 보냄
  const sendCode = async () => {
    try {
      console.log(userInfo.memberEmail);
  
      // URLSearchParams를 사용하여 body를 생성
      const params = new URLSearchParams();
      params.append('email', userInfo.memberEmail);
  
      // axios를 사용하여 POST 요청 보내기
      const response = await axios.post('/auth/send-code', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // URL 인코딩된 데이터 타입
        },
      });
  
      // 응답 처리
      if (response.data.status === 'success') {
        alert('인증 코드가 발송되었습니다.');
        setOperationKey(true); // 상태 업데이트
      } else {
        alert('인증 코드 발송에 실패하였습니다.');
      }
    } catch (error) {
      // 에러 처리
      console.error('Axios error:', error);
      alert('Axios error: ' + error.message);
    }
  };

  // 인증코드 제출버튼 비어있다면 출력
  const submitSuccess = async () => {
    if (!securityCode) {
      alert("인증 코드를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "/auth/verify-code",
        new URLSearchParams({
          email: userInfo.memberEmail,
          code: securityCode,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.status === "success") {
        alert("인증이 완료되었습니다.");
        navigate("/passwordChange", { state: { data: response.data } });
      } else {
        alert("인증 코드가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("인증 코드 검증에 실패하였습니다.");
    }
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

      <div className="findPw-container">
        <div className="findPw-title">
          <h1>비밀번호 찾기</h1>
        </div>
        {!change ? (
          <div className="findPw">
            <div className="findPw-input">
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
            <div className="findPw-input">
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
            <div className="findPw-input">
              <div>
                <label>전화번호</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="-을 제외한 전화번호 11자리를 입력하세요."
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
        ) : (
          <div>
            <div className="findPw">
              <h3>등록된 정보를 통한 이메일로 임시 비밀번호를 발송합니다.</h3>
              <div className="email-Auth">
                <h3>{userInfo.memberName}님!</h3>
                <h6>인증받을 본인의 이메일을 확인해주세요.</h6>
                <div className="email-Auth">
                  <h3>{userInfo.memberEmail}</h3>
                </div>
              </div>
              {!operationKey ? (
                <div className="email-Auth">
                  <button className="btn btn-dark" onClick={sendCode}>
                    인증코드 발송
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="인증코드를 입력해주세요."
                  />
                  <br />
                  <button className="btn btn-dark" onClick={submitSuccess}>
                    인증코드 제출하기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPw;
