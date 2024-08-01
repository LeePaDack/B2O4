import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MyPageCss.css";

const MyPage = () => {
  const [selectProfile, setSelectProfile] = useState(null);

  const [memberInfo, setMemberinfo] = useState("");

  useEffect(() => {
    UserInfo();
  }, []);

  const UserInfo = async () => {
    const res = await axios.get("/members");
    setMemberinfo(res.data);
  };

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
            <tr key={member.memberNo}>
              <td>{member.memberName}</td>
              <td>{member.memberEmail}</td>
              <td>{member.memberAddress}</td>
              <td>{member.memberPhone}</td>
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
    </div>
  );
};
export default MyPage;
