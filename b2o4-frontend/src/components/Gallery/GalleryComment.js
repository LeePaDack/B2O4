import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyPageContext from "../MyPageContext";
import axios from "axios";
import '../css/GalleryComment.css';

const GalleryComment = () => {
  const { loginMember } = useContext(MyPageContext);
  const location = useLocation();
  const list = location.state.list;

  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [anonymousCount, setAnonymousCount] = useState(() => {
    const storedCount = localStorage.getItem(`anonymousCount_${list.gbPostNo}`);
    return storedCount ? parseInt(storedCount, 10) : 1;
  });
  const [activeCommentId, setActiveCommentId] = useState(null); // 현재 활성화된 댓글 ID
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState({});

  // 댓글 목록 가져오기
  const fetchComment = async () => {
    try {
      const response = await axios.get('/gallery/comment');
      const comments = response.data.filter(comment => comment.gbPostNo === list.gbPostNo);
      
      // 댓글과 답글을 계층적으로 구성
      const topLevelComments = [];
      const commentMap = new Map();
      
      comments.forEach(comment => {
        commentMap.set(comment.gbCommentNo, { ...comment, replies: [] });
        if (comment.gbCommentClass === 1) {
          // 답글은 부모 댓글에 추가
          const parentComment = commentMap.get(comment.parentCommentNo);
          if (parentComment) {
            parentComment.replies.push(comment);
          }
        } else {
          // 댓글은 최상위 댓글 리스트에 추가
          topLevelComments.push(commentMap.get(comment.gbCommentNo));
        }
      });

      // 답글을 작성 시간 기준으로 정렬
      topLevelComments.forEach(comment => {
        comment.replies.sort((a, b) => new Date(b.gbCommentCreateDate) - new Date(a.gbCommentCreateDate));
      });

      // 댓글을 작성 시간 기준으로 정렬
      topLevelComments.sort((a, b) => new Date(b.gbCommentCreateDate) - new Date(a.gbCommentCreateDate));

      setCommentList(topLevelComments);
    } catch (error) {
      console.error("댓글 목록을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  // 댓글 작성하기
  const commentWrite = async () => {
    const formData = new FormData();
    
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
    }
    formData.append("gbCommentContent", content);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append("memberName", loginMember ? loginMember.memberName : `익명${anonymousCount}`);

    try {
      await axios.post('/gallery/comment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("댓글 작성이 완료되었습니다.");
      setContent('');
      setFiles([]);
      fetchComment();

      if (!loginMember) {
        const newCount = anonymousCount + 1;
        setAnonymousCount(newCount);
        localStorage.setItem(`anonymousCount_${list.gbPostNo}`, newCount);
      }
    } catch (error) {
      console.error("댓글 작성에 실패했습니다.", error);
    }
  }

  // 댓글 삭제하기
  const commentDelete = async(gbCommentNo) => {
    try {
      await axios.delete(`/gallery/comment/${gbCommentNo}`);
      alert("삭제되었습니다.");
      fetchComment();
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다.", error);
    }
  }

  // 답글 작성하기
  const replyWrite = async () => {
    if (activeCommentId === null) return;
  
    const formData = new FormData();
    
    formData.append("gbCommentContent", replyContent);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("parentCommentNo", activeCommentId);
    formData.append("gbCommentClass", 1);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append("memberName", loginMember ? loginMember.memberName : `익명${anonymousCount}`);
  
    try {
      await axios.post('/gallery/comment/reply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("답글 작성이 완료되었습니다.");
      setReplyContent(''); // 입력 내용만 초기화
      setActiveCommentId(null); // 답글 입력창을 숨깁니다.
      fetchComment();

      if (!loginMember) {
        const newCount = anonymousCount + 1;
        setAnonymousCount(newCount);
        localStorage.setItem(`anonymousCount_${list.gbPostNo}`, newCount);
      }
    } catch (error) {
      console.error("답글 작성에 실패했습니다.", error);
    }
  }

  // 사진파일 선택 핸들
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // 댓글을 계층적으로 렌더링하는 함수
  const renderComments = (comments) => {
    return comments.map(comment => (
      <div key={comment.gbCommentNo} className="comment-item">
        <div className="name-date">
          <div>
            <p className="comment-writer"><strong>{comment.memberName}</strong></p>
          </div>
          <div className="comment-date">
           <p>{comment.gbCommentCreateDate}</p>
          </div>
        </div>
        <div className="comment-content">
          {comment.gbCommentImages && (
            comment.gbCommentImages.split(",").map(image => (
              <img key={image} src={`http://localhost:9000/images/${image}`} alt={comment.gbCommentNo} />
            ))
          )}
          <p>{comment.gbCommentContent}</p>
        </div>
        <div className="comment-reply">
          {comment.gbCommentClass === 0 && (
            <button onClick={() => {
              // 현재 댓글 ID가 이미 활성화된 상태이면, 비활성화 (숨기기)
              if (activeCommentId === comment.gbCommentNo) {
                setActiveCommentId(null);
                setShowReplies(prev => ({ ...prev, [comment.gbCommentNo]: false }));
              } else {
                // 다른 댓글의 입력창을 숨기고 현재 댓글의 입력창과 답글 목록을 활성화
                setActiveCommentId(comment.gbCommentNo);
                setShowReplies(prev => ({ ...prev, [comment.gbCommentNo]: true }));
              }
            }}>
              {activeCommentId === comment.gbCommentNo ? '답글 숨기기' : '답글'}
            </button>
          )}
          {loginMember && list &&
           (
            (loginMember.memberNo === list.memberNo && 
            (loginMember.memberNo === comment.memberNo || comment.memberName.startsWith('익명'))) || (loginMember.memberNo === comment.memberNo)) && (
              <button onClick={() => commentDelete(comment.gbCommentNo)}>삭제</button>
            )}
        </div>
        {activeCommentId === comment.gbCommentNo && (
          <div className="reply-write">
            <p>{loginMember ? loginMember.memberName : `익명${anonymousCount}`}</p>
            <div className="content-submit">
              <input type="text" placeholder="답글을 남겨보세요" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
              <button onClick={replyWrite}>등록</button>
            </div>
          </div>
        )}
        {showReplies[comment.gbCommentNo] && comment.replies.length > 0 && (
        <div className="reply-list">
          {renderComments(comment.replies)}
        </div>
      )}
      </div>
    ));
  };

  return (
    <div className="comment-container">
      <div className="comment-title">
        <p>comment</p>
      </div>
      <div className="comment-view">
        {renderComments(commentList)}
      </div>
      <div className="comment-write">
        <div className="name-file">
          <p>{loginMember ? loginMember.memberName : `익명${anonymousCount}`}</p>
          <label htmlFor='imageUpload'><img src='/camera.jpg' alt="카메라 아이콘" /></label>
          <input type="file" id="imageUpload" multiple onChange={handleFileChange} />
        </div>
        <div className="content-submit">
          <input type="text" placeholder="댓글을 남겨보세요" value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={commentWrite}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default GalleryComment;