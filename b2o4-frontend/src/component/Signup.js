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
  const [memberProfile, setProfile] = useState(null); // Changed to handle file

  const [idValidation, setIdValidation] = useState(false);
 


  const validateId = (id) => {
    // Regular expression for at least 4 characters long
    const idRegex = /^[a-zA-Z0-9]{4,8}$/;
    return idRegex.test(id);
  }
  const validatePw = (pw) =>{
  //특수문자,영어,숫자 포함 최소 8글자
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return pwRegex.test(pw)
  }
  const validateName = (name) =>{
    const nameRegex = /^[가-힣]{2,5}$/
    return nameRegex.test(name)
  }
  const validateEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
  }
  const validateBirth = (birth) =>{
    const birthRegex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
    return birthRegex.test(birth)
  }
  const validatPhone = (Phone) =>{
    const PhoneRegex = /^[0-9]{7,8}$/
    return PhoneRegex.test(Phone)
  }


  const 아이디중복검사 = (eventId) => {
    setId(eventId);
    

    if (!validateId(eventId)) {
      setIdValidation(false);
      return;
    }

    fetch("/idCheck?id=" + eventId)
      .then(response => response.text())
      .then(result => {
        if (Number(result) === 0) {
          setIdValidation(true);
        } else {
          setIdValidation(false);
        }
      })
      .catch(error => {
        console.error('Error checking ID:', error);
        setIdValidation(false);
      });
  }

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
    }
  }

  const 회원가입버튼 = () => {
    if (!idValidation) {
      alert('아이디가 유효하지 않습니다.');
      return;
    }
    if (memberPw !== memberPwCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('memberId', memberId);
    formData.append('memberPw', memberPw);
    formData.append('memberEmail', memberEmail);
    formData.append('memberName', memberName);
    formData.append('memberBirth', memberBirth);
    formData.append('memberPhone', memberPhone);
    formData.append('memberAddress', memberAddress);
    formData.append('memberProfile', memberProfile); // Append file

    fetch("/register", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Registration successful
        alert('회원가입 성공!');
        // Optionally reset the form state
        setId('');
        setPw('');
        setEmail('');
        setName('');
        setBirth('');
        setPhone('');
        setAddress('');
        setProfile(null); // Reset file state
      } else {
        // Registration failed
        alert('회원가입 실패');
      }
    })
    .catch(error => {
      console.error('Error registering:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    });
  }

  return (
    <div className="signup-container">
      <label> ID :
        <input
          type="text"
          onChange={e => setId(e.target.value)}
          value={memberId}
          className={!idValidation ? 'id-err' : ''}
        />
        <button onClick={(eventId) => 아이디중복검사(memberId)}>중복검사</button>
      </label>
      <br></br>
      <label> PW :
        <input
          type="password"
          onChange={e => setPw(e.target.value)}
          value={memberPw}
        />
      </label>
      <br></br>
      <label> PW 확인 :
        <input
          type="password"
          onChange={e => setPwCheck(e.target.value)}
          value={memberPwCheck}
        />
      </label>
      <br></br>
      <label> Name :
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          value={memberName}
        />
      </label>
      <br></br>
      <label> Email :
        <input
          type="Email"
          onChange={e => setEmail(e.target.value)}
          value={memberEmail}
        />
      </label>
      <br></br>
      <label> Birth :
        <input
          type="text"
          onChange={e => setBirth(e.target.value)}
          value={memberBirth}
        />
      </label>
      <br></br>
      <label> Phone :
        <input
          type="text"
          onChange={e => setPhone(e.target.value)}
          value={memberPhone}
        />
      </label>
      <br></br>
      <label> Address :
        <input
          type="text"
          onChange={e => setAddress(e.target.value)}
          value={memberAddress}
        />
      </label>
      <br></br>
      <label> Profile :
        <input
          type="file"
          onChange={handleProfileUpload}
        />
        {memberProfile && (
          <span>File selected: {memberProfile.name}</span>
        )}
      </label>
      <br></br>
      <button onClick={회원가입버튼}>가입하기</button>
    </div>
  );
}

export default Signup;