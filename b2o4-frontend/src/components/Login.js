import React, { useContext, useState } from "react";
import axios from "axios";
import MyPageContext from "./MyPageContext";
import { Link } from "react-router-dom";
import '../css/Login.css'


const Login = () => {
  const {loginMember, setLoginMember} = useContext(MyPageContext);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const login = () => {
    axios.post("/login", { 
      memberId: id, 
      memberPw: pw, 
     }).then((response) => {
      const { data } = response;
      console.log("로그인 정보 : ", data);

      if (data.loginMember === null) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      setLoginMember(data.loginMember);
      setId("");
      setPw("");
      alert("로그인 성공~!");
      console.log("로그인 멤버 : " + id);
    });
  };


  const logout = () => {
    setId("");
    setPw("");
    setLoginMember(null);
    localStorage.removeItem("loginMember");
    console.log("로그인 멤버 : " + id);
  };
  
  return (
    <div className="wrapper">
        <div className="login-container">
          <h2>Login</h2>
          {!loginMember && (
            <>
              <div className="input-login">
                <div className="input-fields">
                  <input
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    placeholder="Id"
                  />
                  <input
                    type="password"
                    onChange={(e) => setPw(e.target.value)}
                    value={pw}
                    placeholder="Password"
                  />
                </div>
                <button onClick={login}>로그인</button>
              </div>
          </>
          )}
          {loginMember && (
          <div className="login-complete">
            <p>{loginMember.memberId}님 환영합니다.</p>
            <button><Link to='/'>Home</Link></button>
            <button onClick={logout}>로그아웃</button>
          </div>
          )}
          <ul>
            <li><Link to='/' >아이디ㆍ비밀번호 찾기</Link></li>
            <li><Link to='/' >회원가입</Link></li>
          </ul>
        </div>
       
    </div>
  );
}
export default Login;