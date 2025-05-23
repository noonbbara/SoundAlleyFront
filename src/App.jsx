import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import KakaoCallback from "./components/KakaoCallback";
import WritePost from "./pages/WritePost";
import './index.css';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/oauth2/callback/kakao" element={<KakaoCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
