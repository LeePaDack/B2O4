import React, { useContext, useState, useEffect } from "react";
import MyPageContext from "../MyPage/MyPageContext";
import axios from "axios";

const MyPage = () => {
  const { loginMember, setLoginMember } = useContext(MyPageContext);
  console.log(loginMember);
  const [memberInfo, setMemberInfo] = useState({
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberName: "",
    memberPhone: "",
    memberAddress: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (loginMember) {
      // loginMember가 null이 아닌 경우에만 API 호출
      axios
        .get(`/api/mypage/${loginMember.memberId}`)
        .then((response) => {
          setMemberInfo(response.data);
        })
        .catch((error) => {
          console.error("멤버 불러오기 실패 :", error);
        });
    }
  }, [loginMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .put("/api/mypage/update", memberInfo)
      .then((response) => {
        alert("회원 정보 업데이트 성공");
        setLoginMember(response.data); // 업데이트된 정보를 Context에 반영
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("회원 정보 업데이트 실패 :", error);
      });
  };

  const cancelBtn = () => {
    setIsEditing(false);
  };

  if (!loginMember) {
    return <div>로그인이 필요합니다.</div>; // loginMember가 null인 경우 렌더링되는 내용
  }
console.log("멤버 정보",memberInfo);
  return (
    <div>
      <h1>마이페이지</h1>
      <label>
        이름 : 
        <input type="text"
        value={memberInfo.memberName}
        placeholder={loginMember.memberName}
        onChange={handleChange}
        />
      </label>
      <label>
        이메일 : 
        <input type="email"
        value={memberInfo.memberEmail}
        placeholder={loginMember.memberEmail}
        onChange={handleChange}
        />
      </label>
      <label>
        핸드폰 번호 : 
        <input type="text"
        value={memberInfo.memberPhone}
        placeholder={loginMember.memberPhone}
        onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default MyPage;
