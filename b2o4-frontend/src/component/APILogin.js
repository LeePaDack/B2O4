import React, { useEffect, useState } from "react";
const Login = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const 유저정보 = () => {
            fetch('http://localhost:9010/userInfo') 
            .then(가져온응답결과 => { 
                return 가져온응답결과.json();
            })
            .then(data => {       
                setUserInfo(data);
            })
            .catch(err => {        
                console.error("Error user INFO : " , err);
            })
        };

    
        유저정보();
    },[]) 

    return (
        <>

        {userInfo ? ('존재한다면 보여줄 코드') : ('존재하지 않다면 보여줄 코드')  }


        {userInfo ? ( 
      
        <div>
            <h1>로그인 완료!</h1>
            <div>{JSON.stringify(userInfo, null, 2) } </div>
        </div>

        ) : (
        <a href="http://localhost:9010/naverLogin">
            네이버로 로그인하기
        </a>

        )  }


        </>
    )
}

export default Login;
