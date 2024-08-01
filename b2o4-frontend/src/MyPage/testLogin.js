import React, { useContext, useState } from "react";

import MyPageContext from "./MyPageContext";

const Login = () => {

  const { loginMember, setLoginMember } = useContext(MyPageContext);

 
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");


  const login = () => {
    

    fetch('/login', {
        method: 'POST',

        headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
        },
        body : JSON.stringify({id : id, pw : pw}) 
    })
    .then(response => response.json())
    .then(map => {
        console.log(map);

        if (map.loginMember === null) {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoginMember(map.loginMember);
        setId('');
        setPw('');
        alert('로그인 성공~!')
        console.log('로그인 멤버 : ' + id)
    })
  }

    const logout = () => {
      setId('');
      setPw('');
      setLoginMember(null);
      console.log('로그인 멤버 : ' + id)
    }

  return (
    <div className="login-container">
      <table>
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
      {loginMember && (
        <button onClick={logout}>로그아웃</button>
      )}
    </div>
  );
};

export default Login;
