const Login = () => {
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=d0c74af08a3faa5561b7192e82c0aeb7&redirect_uri=http://localhost:3000/kakao/callback&response_type=code";

  return (
    <div>
      <h1>로그인</h1>
      <a href={KAKAO_AUTH_URL}>
        <button>카카오로 로그인</button>
      </a>
    </div>
  );
};

export default Login;
