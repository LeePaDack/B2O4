import React, { useState } from "react";
import "./Signup.css"; // CSS 파일을 별도로 분리하여 불러옵니다.

const Signup = () => {
  // State 관리
  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    email: "",
    birth: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 상태 추가
  const [result, setResult] = useState("");

  const [idValidation, setIdValidation] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자 및 숫자

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // 입력값 유효성 검사 및 오류 메시지 설정
    switch (name) {
      case "pw":
        if (value && !passwordRegex.test(value)) {
          setPwError(
            "비밀번호는 최소 8자, 최소 하나의 문자 및 숫자를 포함해야 합니다."
          );
        } else {
          setPwError("");
        }
        break;
      case "pwCheck":
        if (value && value !== formData.pw) {
          setPwCheckError("비밀번호가 일치하지 않습니다.");
        } else {
          setPwCheckError("");
        }
        break;
      case "email":
        if (value && !emailRegex.test(value)) {
          setEmailError("유효하지 않은 이메일 형식입니다.");
        } else {
          setEmailError("");
        }
        break;
      case "birth":
        if (value && !birthRegex.test(value)) {
          setBirthError("유효하지 않은 생년월일 형식입니다. (예: 1990-01-01)");
        } else {
          setBirthError("");
        }
        break;
      case "phone":
        if (value && !phoneRegex.test(value)) {
          setPhoneError(
            "유효하지 않은 핸드폰 번호 형식입니다. (예: 010-1234-5678)"
          );
        } else {
          setPhoneError("");
        }
        break;
      default:
        break;
    }
  };

  // 아이디 중복 확인 함수
  const checkIdAvailability = () => {
    const { id } = formData;

    if (id.trim().length < 4) {
      setIdValidation(false);
      setIdError("아이디는 4글자 이상이어야 합니다.");
      return;
    }

    fetch(`/members/idCheck?id=${id}`)
      .then((response) => response.text())
      .then((result) => {
        if (Number(result) === 0) {
          setIdValidation(true);
          setIdError("사용 가능한 아이디입니다.");
        } else {
          setIdValidation(false);
          setIdError("이미 사용 중인 아이디입니다.");
        }
      })
      .catch(() => {
        setIdValidation(false);
        setIdError("아이디 확인 중 오류가 발생했습니다.");
      });
  };

  // 회원가입 처리 함수
  const handleSignup = () => {
    const { id, pw, pwCheck, email, birth, phone } = formData;

    if (!idValidation) {
      alert("아이디가 유효하지 않습니다.");
      return;
    }

    if (!passwordRegex.test(pw)) {
      alert("비밀번호를 다시 확인하세요.");
      return;
    }

    if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (!birthRegex.test(birth)) {
      alert("유효하지 않은 생년월일 형식입니다. (예: 1990-01-01)");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("유효하지 않은 핸드폰 번호 형식입니다. (예: 010-1234-5678)");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    fetch("/members/signup", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        if (Number(result) > 0) {
          setResult("회원가입 성공");
          resetForm(); // 입력 필드 초기화 함수 호출
        } else {
          setResult("회원가입 실패");
        }
      })
      .catch(() => setResult("회원가입 중 오류가 발생했습니다."));
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profileImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 입력 폼 초기화 함수
  const resetForm = () => {
    setFormData({
      id: "",
      pw: "",
      pwCheck: "",
      name: "",
      email: "",
      birth: "",
      phone: "",
      address: "",
      profileImage: null,
    });
    setPreviewImage(null);
    setIdError(""); // 성공 시 에러 메시지 초기화
    setPwError("");
    setPwCheckError("");
    setEmailError("");
    setBirthError("");
    setPhoneError("");
  };

  return (
    <div className="signup-container">
      <label>
        아이디
        <input
          type="text"
          name="id"
          onChange={handleChange}
          value={formData.id}
          className={idValidation || !formData.id ? "" : "id-err"}
        />
        {idError && <div style={{ color: "red" }}>{idError}</div>}
      </label>
      <button onClick={checkIdAvailability}>중복확인</button>

      <label>
        비밀번호
        <input
          type="password"
          name="pw"
          onChange={handleChange}
          value={formData.pw}
        />
        {pwError && formData.pw && (
          <div style={{ color: "red" }}>{pwError}</div>
        )}
      </label>

      <label>
        비밀번호 확인
        <input
          type="password"
          name="pwCheck"
          onChange={handleChange}
          value={formData.pwCheck}
        />
        {pwCheckError && formData.pwCheck && (
          <div style={{ color: "red" }}>{pwCheckError}</div>
        )}
      </label>

      <label>
        이름
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </label>

      <label>
        이메일
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {emailError && formData.email && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
      </label>

      <label>
        생년월일
        <input
          type="text"
          name="birth"
          onChange={handleChange}
          value={formData.birth}
          placeholder="YYYY-MM-DD"
        />
        {birthError && formData.birth && (
          <div style={{ color: "red" }}>{birthError}</div>
        )}
      </label>

      <label>
        핸드폰번호
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          placeholder="010-1234-5678"
        />
        {phoneError && formData.phone && (
          <div style={{ color: "red" }}>{phoneError}</div>
        )}
      </label>

      <label>
        주소
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={formData.address}
        />
      </label>

      <label>
        프로필 이미지
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </label>

      {previewImage && (
        <div className="image-preview">
          <img
            src={previewImage}
            alt="프로필 미리보기"
            style={{ width: "100px", height: "100px" }}
          />

        </div>
      )}

      <button onClick={handleSignup}>가입하기</button>

      <hr />

      <h3>{result}</h3>
    </div>
  );
};

export default Signup;
