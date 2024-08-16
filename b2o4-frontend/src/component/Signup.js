import React, { useState } from 'react';
import './Signup.css'; // CSS 파일을 별도로 분리하여 불러옵니다.

const Signup = () => {
  const [member, setMember] = useState({
    memberId: '',
    memberPw: '',
    memberName: '',
    memberPhone: '',
    memberEmail: '',
    memberAddress: '',
    memberbirth: '',
    profileImage: '',
    memberProfile: null, // 이미지 파일을 저장할 상태 추가
  });

  const [errors, setErrors] = useState({
    memberId: '',
    memberPw: '',
    memberName: '',
    memberPhone: '',
    memberEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 실시간으로 유효성 검사
    if (value) {
      validateField(name, value);
    } else {
      setErrors({
        ...errors,
        [name]: '' // 값이 없을 때는 오류 메시지를 초기화합니다.
      });
    }

    setMember({
      ...member,
      [name]: value
    });
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'memberId') {
      if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
        errorMsg = '아이디는 4-12자의 영문, 숫자 조합이어야 합니다.';
      }
    } else if (name === 'memberPw') {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        errorMsg = '비밀번호는 최소 8자, 하나 이상의 문자 및 숫자를 포함해야 합니다.';
      }
    } else if (name === 'memberName') {
      if (!/^[가-힣a-zA-Z\s]{2,30}$/.test(value)) {
        errorMsg = '이름은 2-30자의 한글 또는 영문이어야 합니다.';
      }
    } else if (name === 'memberPhone') {
      if (!/^\d{10,11}$/.test(value)) {
        errorMsg = '핸드폰번호는 10-11자리의 숫자이어야 합니다.';
      }
    } else if (name === 'memberEmail') {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
        errorMsg = '올바른 이메일 주소를 입력해주세요.';
      }
    }

    setErrors({
      ...errors,
      [name]: errorMsg
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember({
        ...member,
        profileImage: URL.createObjectURL(file), // 미리보기를 위한 URL 생성
        memberProfile: file // 실제 업로드할 파일을 상태에 저장
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼이 제출되기 전에 모든 필드에 대해 유효성 검사를 수행
    Object.keys(member).forEach((name) => validateField(name, member[name]));
    
    // 오류가 있는 경우 제출을 중지
    if (Object.values(errors).some((error) => error !== '')) {
      console.log('유효성 검사 오류:', errors);
      return;
    }

    console.log('Member Data:', member);

    // FormData를 사용하여 파일과 데이터를 함께 전송
    const formData = new FormData();
    formData.append('memberId', member.memberId);
    formData.append('memberPw', member.memberPw);
    formData.append('memberName', member.memberName);
    formData.append('memberPhone', member.memberPhone);
    formData.append('memberEmail', member.memberEmail);
    formData.append('memberAddress', member.memberAddress);
    formData.append('memberbirth', member.memberbirth);
    if (member.profileImage) {
      formData.append('profileImage', member.memberProfile);
    }

    fetch('http://localhost:9000/api/members', {
      method: 'POST',
      headers: {'Content-Type' : "multipart/form-data"},
      body: formData, // FormData를 직접 전송
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // 추가적으로 성공 시 처리할 작업
      })
      .catch((error) => {
        console.error('Error:', error);
        // 추가적으로 에러 시 처리할 작업
      });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            아이디
            <div className="input-container">
              <input
                type="text"
                name="memberId"
                value={member.memberId}
                onChange={handleChange}
              />
              <button type="button">중복확인</button> {/* 중복확인 버튼 */}
            </div>
            {errors.memberId && errors.memberId !== '' && (
              <div style={{ color: 'red' }}>{errors.memberId}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            비밀번호
            <input
              type="password"
              name="memberPw"
              value={member.memberPw}
              onChange={handleChange}
            />
            {errors.memberPw && errors.memberPw !== '' && (
              <div style={{ color: 'red' }}>{errors.memberPw}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            이름
            <input
              type="text"
              name="memberName"
              value={member.memberName}
              onChange={handleChange}
            />
            {errors.memberName && errors.memberName !== '' && (
              <div style={{ color: 'red' }}>{errors.memberName}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            핸드폰번호
            <input
              type="text"
              name="memberPhone"
              value={member.memberPhone}
              onChange={handleChange}
            />
            {errors.memberPhone && errors.memberPhone !== '' && (
              <div style={{ color: 'red' }}>{errors.memberPhone}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            이메일
            <input
              type="email"
              name="memberEmail"
              value={member.memberEmail}
              onChange={handleChange}
            />
            {errors.memberEmail && errors.memberEmail !== '' && (
              <div style={{ color: 'red' }}>{errors.memberEmail}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            주소
            <input
              type="text"
              name="memberAddress"
              value={member.memberAddress}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            생년월일
            <input
              type="date"
              name="memberbirth"
              value={member.memberbirth}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            프로필
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {member.profileImage && (
            <div>
              <img
                src={member.memberProfile}
                alt="Profile Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            </div>
          )}
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;
