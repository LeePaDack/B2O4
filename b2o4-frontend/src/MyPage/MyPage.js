import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/MyPageCss.css";
import MyPageContext from "./MyPageContext";

const MyPage = () => {
  const  loginMember  = useContext(MyPageContext);
  const [selectProfile, setSelectProfile] = useState(null);

  const [memberInfo, setMemberInfo] = useState(MyPageContext);


  // 수정내용 제출버튼
  const updateInfo = (e) => {
    
  }

  const updateProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mypage-container">
      <table>
        <tbody>
          {memberInfo.map((member) => (
            <tr >
              <td><input type="text" />{/* 유저 이름 */}</td>
              <td><input type="email" />{/* 유저 이메일 */}</td>
              <td><input type="text" />{/* 유저 주소 */}</td>
              <td><input type="text" />{/* 유저 핸드폰번호 */}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="profile-container">
        <h4>프로필 사진 변경</h4>
        {selectProfile && (
          <div>
            <img src={selectProfile} className="proFileImg" />
          </div>
        )}
        <label htmlFor="imgSelect" className="updateProFileBtn">
          사진 선택하기
        </label>
        <input
          type="file"
          id="imgSelect"
          accept="image/*"
          onChange={updateProfile}
          className="updateProFileInput"
        />
      </div>
      <button onClick={updateInfo} >수정하기</button>
    </div>
  );
};
export default MyPage;
