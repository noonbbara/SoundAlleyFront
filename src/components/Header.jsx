import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';

const CLIENT_ID = "d0c74af08a3faa5561b7192e82c0aeb7";
const REDIRECT_URI = "http://localhost:3000/oauth2/callback/kakao"; // 백엔드에 등록된 redirect URI

function Header({ setLoggedInUserId }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT 토큰 저장 방식 예시

  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=profile_nickname`;
    window.location.href = kakaoAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('userId');
    //setLoggedInUserId(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title" onClick={() => navigate("/")}>
          소리 골목
        </h1>

        <div className="header-buttons">
          <button
            onClick={() => {
              if (token) {
                navigate("/write");
              } else {
                alert("로그인 후 이용하세요");
                handleLogin();
              }
            }}
            className={"write-button"}
          >
            글쓰기
          </button>

          {token ? (
            <button onClick={handleLogout} className="logout-button">
              로그아웃
            </button>
          ) : (
            <button onClick={handleLogin} className="login-button">
              카카오 로그인
            </button>
          )}
        </div>
      </div>
    </header>
);
}

export default Header;
