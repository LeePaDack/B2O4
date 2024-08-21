import React, { useState } from 'react';
import './Signup.css'; // CSS 파일을 별도로 분리
import axios from 'axios';

const Signup = () => {
  const [member, setMember] = useState({
    memberId: '',
    memberPw: '',
    memberPwConfirm: '', 
    memberName: '',
    memberPhone: '',
    memberEmail: '',
    memberAddress: '',
    memberBirth: '',
    profileImage: '', // 미리보기를 위한 URL을 저장
    memberProfile: null,  // 이미지 파일을 저장할 상태 추가
  });

  const [errors, setErrors] = useState({
    memberId: '',
    memberPw: '',
    memberPwConfirm: '', 
    memberName: '',
    memberPhone: '',
    memberEmail: ''
  });

  const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 중복 검사 결과 저장

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);

    setMember((prevMember) => ({
      ...prevMember,
      [name]: value
    }));
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'memberId':
        if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
          errorMsg = '아이디는 4-12자의 영문, 숫자 조합이어야 합니다.';
        }
        break;
      case 'memberPw':
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
          errorMsg = '비밀번호는 최소 8자, 하나 이상의 문자 및 숫자를 포함해야 합니다.';
        }
        break;
      case 'memberPwConfirm':
        if (value !== member.memberPw) {
          errorMsg = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'memberName':
        if (!/^[가-힣a-zA-Z\s]{2,30}$/.test(value)) {
          errorMsg = '이름은 2-30자의 한글 또는 영문이어야 합니다.';
        }
        break;
      case 'memberPhone':
        if (!/^\d{10,11}$/.test(value)) {
          errorMsg = '핸드폰번호는 - 없이 10-11자리의 숫자이어야 합니다.';
        }
        break;
      case 'memberEmail':
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          errorMsg = '올바른 이메일 주소를 입력해주세요.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
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

  const handleIdCheck = async () => {
    if (!member.memberId.trim()) {
      alert("아이디를 입력하세요");
      setIsIdAvailable(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:9000/api/idCheck', {
        params: { id: member.memberId },
      });

      if (response.data.isAvailable) {
        setIsIdAvailable(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberId: '',
        }));
      } else {
        setIsIdAvailable(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberId: '이미 사용 중인 아이디입니다.',
        }));
      }
    } catch (error) {
      console.error('ID 체크 중 문제 발생:', error);
      setIsIdAvailable(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 필드에 대한 유효성 검사 수행
    Object.keys(member).forEach((name) => validateField(name, member[name]));

    // 이미지 파일이 선택되지 않은 경우 에러 처리
    if (!member.memberProfile) {
        setErrors({
            ...errors,
            memberProfile: '프로필 이미지를 선택해주세요.'
        });
        return;
    }

        // 오류가 있는 경우 제출 중지
        if (Object.values(errors).some((error) => error !== '')) {
          console.log('유효성 검사 오류:', errors);
          return;
      }

      console.log('Member Data:', member);

    const formData = new FormData();
    formData.append('memberId', member.memberId);
    formData.append('memberPw', member.memberPw);
    formData.append('memberName', member.memberName);
    formData.append('memberPhone', member.memberPhone);
    formData.append('memberEmail', member.memberEmail);
    formData.append('memberAddress', member.memberAddress);
    formData.append('memberBirth', member.memberBirth);
    formData.append('profileImage', member.memberProfile);

    fetch('http://localhost:9000/api/members', {
      method: 'POST',
      body: formData,
  })
      .then((response) => response.text())
      .then((fileName) => {
          console.log('성공:', fileName);
          setMember({
              ...member,
              memberProfile: fileName
          });
      })
      .catch((error) => {
          console.error('오류 발생:', error);
      });
};
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setMember((prevMember) => ({
          ...prevMember,
          memberAddress: data.address
        }));
      }
    }).open();
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
              <button type="button" onClick={handleIdCheck}>중복확인</button>
            </div>
            {errors.memberId && (
              <div style={{ color: 'red' }}>{errors.memberId}</div>
            )}
            {isIdAvailable === true && (
              <div style={{ color: 'green' }}>사용 가능한 아이디입니다.</div>
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
            {errors.memberPw && (
              <div style={{ color: 'red' }}>{errors.memberPw}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            비밀번호 확인
            <input
              type="password"
              name="memberPwConfirm"
              value={member.memberPwConfirm}
              onChange={handleChange}
            />
            {errors.memberPwConfirm && (
              <div style={{ color: 'red' }}>{errors.memberPwConfirm}</div>
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
            {errors.memberName && (
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
            {errors.memberPhone && (
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
            {errors.memberEmail && (
              <div style={{ color: 'red' }}>{errors.memberEmail}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            생년월일
            <input
              type="date"
              name="memberBirth"
              value={member.memberBirth}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            주소
            <div className="input-container">
              <input
                type="text"
                name="memberAddress"
                value={member.memberAddress}
                onChange={handleChange}
              />
              <button type="button" onClick={handleAddressSearch}>주소 검색</button>
            </div>
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
                src={member.profileImage} 
                alt="Profile Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            </div>
          )}
        </div>
        <div className="button-container">
    <button type="submit">가입하기</button>
  </div>
      </form>
    </div>
  );
};

export default Signup;
