import React, { useState } from "react";

const Signup = () => {
  const [memberId, setId] = useState('');
  const [memberPw, setPw] = useState('');
  const [memberPwCheck, setPwCheck] = useState('');
  const [memberEmail, setEmail] = useState('');
  const [memberName, setName] = useState('');
  const [memberBirth, setBirth] = useState('');
  const [memberPhone, setPhone] = useState('');
  const [memberAddress, setAddress] = useState('');
  const [memberProfile, setProfile] = useState('F');

  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  // 정규식을 통한 유효성 검사 함수들
 const validateId = (id) => {
  const idRegex = /^[a-zA-Z0-9]{4,8}$/;
  return idRegex.test(id);
};

const validatePw = (pw) => {
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return pwRegex.test(pw);
};

const validateName = (name) => {
  const nameRegex = /^[가-힣]{2,5}$/;
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateBirth = (birth) => {
  const birthRegex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  return birthRegex.test(birth);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{8,12}$/;
  return phoneRegex.test(phone);
};
  // 입력 필드 핸들러 함수들
const handleIdChange = (e) => {
  setId(e.target.value);
};
 // 아이디 중복 체크 함수
  const checkIdAvailability = () => {
    if (!validateId(memberId)) {
      setIdError('아이디는 4-8자의 영문, 숫자만 가능합니다.');
      setIsIdAvailable(false);
      return;
    }
  // API 호출을 통해 아이디 중복 여부 확인
    fetch('idCheck?memberId=' + memberId) 
      .then(response => response.json())
      .then(result => {
        if (!result) {
          setIdError('');
          setIsIdAvailable(true);
          alert('사용 가능한 아이디입니다.');
        } else {
          setIdError('중복된 아이디입니다.');
          setIsIdAvailable(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIdError('아이디 확인 중 오류가 발생했습니다.');
      });
  };
// 비밀번호 변경 핸들러
  const handlePwChange = (e) => {
    const value = e.target.value;
    setPw(value);
    if (!validatePw(value)) {
      setPwError('비밀번호는 특수문자, 영어, 숫자를 포함한 최소 8글자여야 합니다.');
    } else {
      setPwError('');
    }
  };
 // 이름 변경 핸들러
  const handlePwCheckChange = (e) => {
    const value = e.target.value;
    setPwCheck(value);
    if (value !== memberPw) {
      setPwCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPwCheckError('');
    }
  };
// 이메일 변경 핸들러
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!validateName(value)) {
      setNameError('이름은 2-5자의 한글만 가능합니다.');
    } else {
      setNameError('');
    }
  };
 // 생년월일 변경 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('유효한 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };
 // 전화번호 변경 핸들러
  const handleBirthChange = (e) => {
    const value = e.target.value;
    setBirth(value);
    if (!validateBirth(value)) {
      setBirthError('유효한 생년월일 형식을 입력해주세요 (예: 880704)');
    } else {
      setBirthError('');
    }
  };
 // 프로필 파일 업로드 핸들러
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (!validatePhone(value)) {
      setPhoneError('유효한 전화번호 형식을 입력해주세요.');
    } else {
      setPhoneError('');
    }
  };
// 회원가입 요청 처리 함수
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
    }
  };
  // 회원가입 요청 처리 함수
  const handleSignup = () => {
    // 필수 입력 필드 확인 및 유효성 검사 결과 확인
    if (!memberId || !memberPw || !memberPwCheck || !memberEmail || !memberName || !memberBirth || !memberPhone || idError || pwError || pwCheckError || nameError || emailError || birthError || phoneError || !isIdAvailable) {
      alert('모든 필수 입력 필드를 올바르게 입력해 주세요.');
      return;
    }
     // FormData를 이용해 회원 정보를 서버에 전송
    const formData = new FormData();
    formData.append('memberId', memberId);
    formData.append('memberPw', memberPw);
    formData.append('memberEmail', memberEmail);
    formData.append('memberName', memberName);
    formData.append('memberBirth', memberBirth);
    formData.append('memberPhone', memberPhone);
    formData.append('memberAddress', memberAddress);
    formData.append('memberProfile', memberProfile);
    
    fetch("/register", {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.ok) {
           // 회원가입 성공 시 입력 필드 초기화
          alert('회원가입 성공!');
          setId('');
          setPw('');
          setPwCheck('');
          setEmail('');
          setName('');
          setBirth('');
          setPhone('');
          setAddress('');
          setProfile('');
        } else {
          alert('회원가입 실패');
        }
      })
      .catch(error => {
        console.error('Error registering:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="signup-container">
      <label>
        아이디
        <div className="input-container">
          <input
            type="text"
            onChange={handleIdChange}
            value={memberId}
            className={idError ? 'id-err' : ''}
          />
          <button onClick={checkIdAvailability}>중복 검사</button>
        </div>
        {idError && <div style={{ color: 'red' }}>{idError}</div>}
      </label>
      <br />
      <label>
        비밀번호
        <input
          type="password"
          onChange={handlePwChange}
          value={memberPw}
        />
        {pwError && <div style={{ color: 'red' }}>{pwError}</div>}
      </label>
      <br />
      <label>
        비밀번호 일치확인
        <input
          type="password"
          onChange={handlePwCheckChange}
          value={memberPwCheck}
        />
        {pwCheckError && <div style={{ color: 'red' }}>{pwCheckError}</div>}
      </label>
      <br />
      <label>
        이름
        <input
          type="text"
          onChange={handleNameChange}
          value={memberName}
        />
        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
      </label>
      <br />
      <label>
        이메일
        <div className="input-container">
          <input
            type="email"
            onChange={handleEmailChange}
            value={memberEmail}
          />
        </div>
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      </label>
      <br />
      <label>
        생년월일
        <input
          type="text"
          onChange={handleBirthChange}
          value={memberBirth}
        />
        {birthError && <div style={{ color: 'red' }}>{birthError}</div>}
      </label>
      <br />
      <label>
        휴대폰번호
        <input
          type="text"
          onChange={handlePhoneChange}
          value={memberPhone}
        />
        {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
      </label>
      <br />
      <label>
        주소
        <input
          type="text"
          onChange={e => setAddress(e.target.value)}
          value={memberAddress}
        />
      </label>
      <br />
      <label>
        프로필
        <input
          type="file"
          onChange={handleProfileUpload}
        />
        {memberProfile && (
          <span>File selected: {memberProfile.name}</span>
        )}
      </label>
      <br />
      <button onClick={handleSignup}>가입하기</button>
    </div>
  );
}

export default Signup;
