import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      axios
        .post("http://localhost:9000/auth/kakao/callback", { code })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          navigate("/signup/kakao", { state: { userInfo: data } });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div>
      <h2>Logging in...</h2>
    </div>
  );
};

export default KakaoRedirection;