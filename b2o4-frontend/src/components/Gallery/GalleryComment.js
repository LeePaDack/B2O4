import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyPageContext from "../MyPageContext";
import axios from "axios";

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
  const [replyInput, setReplyInput] = useState(null); // 현재 답글을 달고 있는 댓글의 gbCommentNo
  const [replyContent, setReplyContent] = useState(''); // 답글 내용
  const [showReplies, setShowReplies] = useState(false);

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
    if (replyInput === null) return;
  
    const formData = new FormData();
    
    formData.append("gbCommentContent", replyContent);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("parentCommentNo", replyInput);
    formData.append("gbCommentClass", 1);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append("memberName", loginMember ? loginMember.memberName : `익명${anonymousCount}`);
  
    try {
      await axios.post('/gallery/comment/reply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("답글 작성이 완료되었습니다.");
      setReplyContent('');
      setReplyInput([]);
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
        <p className="comment-writer">
          <strong>{comment.memberName}</strong>
        </p>
        <div className="comment-content">
          {comment.gbCommentImages && (
            comment.gbCommentImages.split(",").map(image => (
              <img key={image} src={`http://localhost:9000/images/${image}`} alt={comment.gbCommentNo} />
            ))
          )}
          <p>{comment.gbCommentContent}</p>
        </div>
        <div className="comment-date">
          <p>{comment.gbCommentCreateDate}
          {comment.gbCommentClass === 0 && (
            <button onClick={() => setReplyInput(replyInput === comment.gbCommentNo ? null : comment.gbCommentNo)}>
              {replyInput === comment.gbCommentNo ? '답글달기 취소' : '답글달기'}
            </button>
          )}
            {loginMember && list &&
             (
              (loginMember.memberNo === list.memberNo && 
              (loginMember.memberNo === comment.memberNo || comment.memberName.startsWith('익명'))) || (loginMember.memberNo === comment.memberNo) ) && (
                <button onClick={() => commentDelete(comment.gbCommentNo)}>삭제</button>
              )}
              {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => setShowReplies(prev => ({ ...prev, [comment.gbCommentNo]: !prev[comment.gbCommentNo] }))}>
              {showReplies[comment.gbCommentNo] ? '답글 숨기기' : '답글 보기'}
            </button>
          )}
          </p>
        </div>
        {replyInput === comment.gbCommentNo && (
          <div className="reply-write">
            <p>{loginMember ? loginMember.memberName : `익명${anonymousCount}`}</p>
            <textarea placeholder="답글을 남겨보세요" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button onClick={replyWrite}>등록</button>
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
        <p>{loginMember ? loginMember.memberName : `익명${anonymousCount}`}</p>
        <input type="text" placeholder="댓글을 남겨보세요" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={commentWrite}>등록</button>
      </div>
    </div>
  );
};

export default GalleryComment;