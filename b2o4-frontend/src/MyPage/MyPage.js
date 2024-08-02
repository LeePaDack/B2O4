import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/MyPageCss.css";
import MyPageContext from "./MyPageContext";

const MyPage = () => {
  const { loginMember } = useContext(MyPageContext);
  const [selectProfile, setSelectProfile] = useState(null);

  const [memberInfo, setMemberInfo] = useState("");

  useEffect(() => {
    if (loginMember) {
      axios
        .get("/mypage", { params: { memberId: loginMember.memberId } })
        .then((response) => {
          const { data } = response;
          setMemberInfo(data.member);
        });
    }
  }, [loginMember]);

  if (!loginMember) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!memberInfo) {
    return <div>로딩 중...</div>;
  }

  const UserInfo = async () => {
    const response = axios.get("/members");
    setMemberInfo(response.data);
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
