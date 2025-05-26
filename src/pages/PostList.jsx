import { useEffect, useState } from "react";
import axios from "axios";
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // 상태로 관리

  useEffect(() => {
    setLoggedInUserId(localStorage.getItem('userId')); // mount 시 동기화

    axios.get("http://localhost:8080/api/posts")
      .then(res => setPosts(res.data.result))
      .catch(err => console.error("게시글 로딩 실패", err));
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setPosts(posts.filter(post => post.id !== postId));
        alert('게시글이 삭제되었습니다.');
      } catch (error) {
        console.error("삭제 실패:", error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="post-container">
      <main className="post-list">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            {/* 로그인 상태 + 작성자일 때만 삭제 버튼 보이게 */}
            {loggedInUserId && String(loggedInUserId) === String(post.writerId) && (
              <button
                className="delete-button"
                onClick={() => handleDelete(post.id)}
                title="삭제"
              >
                🗑️
              </button>
            )}
            <h2 className="post-title">{post.title}</h2>
            <div className="post-info">
              <div className="info-item"><span className="info-label">장소:</span><span>{post.place}</span></div>
              <div className="info-item"><span className="info-label">날짜:</span><span>{post.date}</span></div>
              <div className="info-item"><span className="info-label">설명:</span><span>{post.description}</span></div>
            </div>
            <div className="post-writer">
              <span className="info-label">작성자:</span>
              <span>{post.writerName}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

export default PostList;
