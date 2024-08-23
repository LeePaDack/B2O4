import React from 'react';

const LoginPage = () => {
    const handleButtonClick = () => {
        window.location.href = 'http://localhost:9000/oauth/kakao';
    };

    return (
        <div>
            <a onClick={handleButtonClick}>
               <img
               height="50"
               src="kakao.png"
               style={{ cursor: 'pointer' }}
               />
            </a>
        </div>
    );
};

export default LoginPage;