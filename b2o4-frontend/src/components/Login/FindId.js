import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/FindLogin.css';
import axios from "axios";


const FindId = () => {
    const [memberName, setMemberName] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    const[findIdResult, setFindIdResult] = useState(null);

    const findId = () => {
        axios.post("/findId", { memberName: memberName, memberPhone: memberPhone }).then((response) => {
          const { data } = response;
          console.log(data);
    
          if (data.findIdResult === null) {
            alert("일치하지 않습니다.");
            return;
          }
    
          setFindIdResult(data.findIdResult);
          setMemberName("");
          setMemberPhone("");
        });
      };

    return(
        <div className="findId-container">
            <div className="find-Id-Pw">
                <Link to="/findId" className="Link-list">아이디 찾기</Link>
                <Link to="/findPw" className="Link-list">비밀번호 찾기</Link>
            </div>

            <div className="findId">
                <div className="findId-title">
                    <h1>아이디 찾기</h1>
                </div>
                <div className="findId-input">
                    <div>
                        <label>이름</label>
                        <input type="text" placeholder="이름을 입력하세요." value={memberName} onChange={(e) => setMemberName(e.target.value)} required/>
                        <label>전화번호</label>
                        <input type="text" placeholder="전화번호를 입력하세요." value={memberPhone} onChange={(e) => setMemberPhone(e.target.value)} required/>
                    </div>
                    <div>
                        <button onClick={findId}>아이디 찾기</button>
                    </div>
                </div>
               {findIdResult && (
                <>{findIdResult.memberId}</>
               )}
            </div>
        </div> 
    );
}
export default FindId;