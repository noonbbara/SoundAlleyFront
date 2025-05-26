import axios from 'axios';

export const loginWithKakao = async (code) => {
  const response = await axios.get(`http://localhost:8080/oauth2/callback/kakao?code=${code}`);
  return response.data.result; // accessToken, refreshToken
};
