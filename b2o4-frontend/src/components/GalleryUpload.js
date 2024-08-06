import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryUpload = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/gallery/posts');
      console.log("response.data : " + response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("게시물을 가져오는 데 실패했습니다.", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("content", content);

    try {
      await axios.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchPosts();
    } catch (error) {
      console.error("파일 업로드에 실패했습니다.", error);
    }
  };

  return (
    <div className="App">
      <h1>이미지 업로드 게시판</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <input type="text" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpload}>업로드하기</button>
    </div>
  );
}

export default GalleryUpload;
