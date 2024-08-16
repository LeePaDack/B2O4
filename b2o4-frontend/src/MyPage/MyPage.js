import React, { useContext, useState, useEffect } from "react";
import MyPageContext from "../MyPage/MyPageContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/MyPageCss.css";

const MyPage = () => {
  const { loginMember, setLoginMember } = useContext(MyPageContext);
  const [memberInfo, setMemberInfo] = useState({
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberName: "",
    memberPhone: "",
    memberAddress: "",
    memberProfile: "",
  });
  const [defaultName, setDefaultName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(""); // 프로필 이미지 미리보기 상태

  const mainNavigate = useNavigate();

  useEffect(() => {
    if (loginMember) {
      axios
        .get(`/api/mypage/${loginMember.memberId}`)
        .then((response) => {
          setMemberInfo(response.data);
          setDefaultName(response.data.memberName);
          if (response.data.memberProfile) {
            setProfileImagePreview(
              `/images/userProfile/${response.data.memberProfile}`
            );
          }
        })
        .catch((error) => {
          console.error("멤버 불러오기 실패 :", error);
        });
    }
  }, [loginMember]);

  const userInfoChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const profileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      // 파일 URL 생성 및 미리보기 상태 업데이트
      const fileURL = URL.createObjectURL(file);
      setProfileImagePreview(fileURL);

      // 이미지 로드 후 URL을 해제
      return () => URL.revokeObjectURL(fileURL);
    }
  };

  const userInfoSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "memberInfo",
      new Blob([JSON.stringify(memberInfo)], { type: "application/json" })
    );
    if (profileImage) {
      formData.append("memberProfile", profileImage);
    }

    if (window.confirm("수정된 정보를 저장하시겠습니까?")) {
      await axios
        .put("/api/mypage/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("회원 정보 업데이트 성공");
          // 기존 상태 유지 및 업데이트
          setLoginMember((prevMember) => ({
            ...prevMember,
            ...response.data,
          }));

          mainNavigate("/");
        })
        .catch((error) => {
          console.error("회원 정보 업데이트 실패 :", error);
        });
    }
  };

  const userDeleteBtn = () => {
    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
      axios
        .delete(`/api/mypage/delete/${loginMember.memberNo}`)
        .then(() => {
          alert("회원 탈퇴가 완료되었습니다.");
          setLoginMember(null);
          mainNavigate("/");
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패 :", error);
        });
    }
  };

  if (!loginMember) {
    return <div className="login-prompt">로그인이 필요합니다.</div>;
  }

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">⚽{defaultName}님의 마이페이지⚽</h1>
      <div className="mypage-content">
        <div className="user-info">
          <label>
            이름
            <input
              type="text"
              name="memberName"
              value={memberInfo.memberName}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            이메일
            <input
              type="email"
              name="memberEmail"
              value={memberInfo.memberEmail}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            주소
            <input
              type="text"
              name="memberAddress"
              value={memberInfo.memberAddress}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            핸드폰 번호
            <input
              type="text"
              name="memberPhone"
              value={memberInfo.memberPhone}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="user-profile">
          <label>
            프로필 이미지
            <div className="profile-thumbnail">
              {profileImagePreview && (
                <div className="profile-img">
                  <img src={profileImagePreview} className="profile-preview" />
                </div>
              )}
            </div>
            <input
              type="file"
              name="memberProfile"
              accept="image/*"
              onChange={profileChange}
              className="file-input"
            />
          </label>
          <label>
            I D
            <input
              type="text"
              name="memberId"
              value={memberInfo.memberId}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            P W
            <input
              type="password"
              name="memberPw"
              value={memberInfo.memberPw}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
        </div>
      </div>

      <div className="button-group">
        <button className="submit-button" onClick={userInfoSubmit}>
          수정하기
        </button>
        <button className="delete-button" onClick={userDeleteBtn}>
          회원 탈퇴
        </button>
        <Link to="/">
          <button className="home-button">홈으로 돌아가기</button>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
