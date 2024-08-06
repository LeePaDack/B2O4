import React, { useContext, useState } from "react";
import axios from "axios";
import MyPageContext from "./MyPageContext";
import { Link } from "react-router-dom";
import '../components/css/Login.css'

const Login = () => {
  const {loginMember, setLoginMember} = useContext(MyPageContext);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const login = () => {
    axios.post("/login", { memberId: id, memberPw: pw }).then((response) => {
      const { data } = response;
      console.log(data);

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
    console.log("로그인 멤버 : " + id);
  };

  return (
    <div className="wrapper">
        <div className="login-container">
          {!loginMember && (
          <table className="input-login">
            <tbody>
              <tr>
                <th>ID</th>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                  />
                </td>
              </tr>
              <tr>
                <th>PW</th>
                <td>
                  <input
                    type="password"
                    onChange={(e) => setPw(e.target.value)}
                    value={pw}
                  />
                </td>
                <td>
                  <button onClick={login}>로그인</button>
                </td>
              </tr>
            </tbody>
          </table>
          )}
          {loginMember && (
          <>
            <p>{loginMember.memberId}님 환영합니다.</p>
            <button><Link to='/'>Home</Link></button>
            <button onClick={logout}>로그아웃</button>
          </>
          )}
        </div>
      </div>
  );
};

export default Login;