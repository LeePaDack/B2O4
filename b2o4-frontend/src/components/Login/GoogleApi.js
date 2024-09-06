import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import GoogleResult from "./GoogleSignup";

const GoogleApi = () => {
  const [loginResult, setLoginResult] = useState(null);

  console.log("로그인결과 :", loginResult);

  return (
    <GoogleOAuthProvider clientId="">
      <Google setLoginResult={setLoginResult} />
    </GoogleOAuthProvider>
  );
};

export default GoogleApi;