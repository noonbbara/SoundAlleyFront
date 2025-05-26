// WritePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePost.css';

function WritePost() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    place: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('token');
      console.log(accessToken);
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '게시글 등록에 실패했습니다.');
      }

      alert('게시글이 성공적으로 등록되었습니다.');
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.error('게시글 등록 에러:', error);
    }
  };

  return (
    <div className="write-container">
      <form className="write-form" onSubmit={handleSubmit}>
        <h2 className="write-title">새 게시글 작성</h2>
        
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="place">장소</label>
          <input
            type="text"
            id="place"
            name="place"
            value={postData.place}
            onChange={handleChange}
            required
            placeholder="장소를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            name="date"
            value={postData.date}
            onChange={handleChange}
            required
            placeholder="날짜를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={postData.description}
            onChange={handleChange}
            
            placeholder="상세 내용을 입력하세요"
            rows="6"
          />
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            취소
          </button>
          <button type="submit" className="submit-button">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default WritePost;