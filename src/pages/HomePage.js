import React from "react";

function HomePage() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {accessToken ? (
        <>
          <h1>환영합니다! SoundAlley에 로그인되었습니다.</h1>
          <p>즐거운 시간 보내세요!</p>
        </>
      ) : (
        <>
          <h1>Welcome to SoundAlley</h1>
          <p>
            Please{" "}
            <a href="http://localhost:8080/oauth2/authorization/kakao">
              login with Kakao
            </a>{" "}
            to continue.
          </p>
        </>
      )}
    </div>
  );
}

export default HomePage;
