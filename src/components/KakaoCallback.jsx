import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      // 백엔드 로그인 API 호출 예시 (토큰 발급)
      axios
        .post("http://localhost:8080/api/auth/kakao", { code })
        .then((res) => {
          localStorage.setItem("token", res.data.result.accessToken);
          console.log(localStorage.getItem("token"));
          localStorage.setItem("userId", res.data.result.userId);
          console.log(localStorage.getItem("userId"));
          navigate("/"); // 로그인 후 홈으로 이동
        })
        .catch(() => {
          alert("로그인에 실패했습니다.");
          navigate("/");
        });
    }
  }, [location, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
