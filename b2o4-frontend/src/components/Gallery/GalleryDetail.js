import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/GalleryBoard.css";
import Button from "react-bootstrap/esm/Button";
import MyPageContext from "../MyPageContext";

const GalleryDetail = () => {
  const { loginMember } = useContext(MyPageContext);
  
  const location = useLocation();
  const list = location.state.list;

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [anonymousCount, setAnonymousCount] = useState(() => {
    // 로컬 스토리지에서 익명 번호를 읽어오기 없으면 기본값 1
    const storedCount = localStorage.getItem(`anonymousCount_${list.gbPostNo}`);
    return storedCount ? parseInt(storedCount, 10) : 1;
  });

  const [replyInput, setReplyInput] = useState(false); 

  
  // 갤러리 삭제
  const deleteGallery = async (gbPostNo) => {
    try{
      const response = await axios.delete(`/gallery/${gbPostNo}`);
      alert("삭제되었습니다.");
      navigate('/galleryBoard');
    } catch(error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  }


  /************* 코멘트 *******************/

  // 댓글 목록 가져오기
  const fetchComment = async () => {
    try {
      const response = await axios.get('/gallery/comment');
      setCommentList(response.data);
    } catch (error) {
      console.error("게시물을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  // 댓글 작성하기
  const commentWrite = async () => {
    const formData = new FormData();
    
    // 파일이 있는 경우에만 FormData에 파일 추가
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
    }
    formData.append("content", content);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append("memberName", loginMember ? loginMember.memberName : `익명${anonymousCount}`); // 익명으로 설정

    try {
      await axios.post('/gallery/comment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("댓글 작성이 완료되었습니다..");
      setContent('');
      setFiles([]);
      fetchComment();

      if(!loginMember){
        const newCount = anonymousCount + 1;
        setAnonymousCount(newCount);
        localStorage.setItem(`anonymousCount_${list.gbPostNo}`, newCount);
      }

    } catch (error) {
      console.error("댓글 작성에 실패했습니다.", error);
    }
  }

  // 댓글삭제
  const commentDelete = async(gbCommentNo) => {
    try{
      await axios.delete(`/gallery/comment/${gbCommentNo}`);
      alert("삭제되었습니다.");
      fetchComment();
    } catch(error) {
      console.log("s" + gbCommentNo);
      alert("댓글 삭제에 실패했습니다.");
    }
  }


  // 사진파일 선택핸들
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

   // 게시물에 해당하는 댓글만 필터링
  const filteredComments = commentList.filter(comment => comment.gbPostNo === list.gbPostNo);

  return (
    <div className="detail-container">
      <div className="button-container">
        {loginMember && list && loginMember.memberNo === list.memberNo && (
          <>
          <Link to={`/galleryUpdate/${list.gbPostNo}`} >
            <Button variant="secondary">수정</Button>
          </Link>
          <Button variant="secondary" onClick={() => deleteGallery(list.gbPostNo)}>삭제</Button>
          </>
        )}
    </div>
      <div className="detail-content">
        <p className="category"> > 갤러리</p>
        <h1>{list.gbPostTitle}</h1>
        <h5>{list.gbPostCreateDate}</h5>
        <div className="detail-item">
          {list.gbImages ? (
            list.gbImages
              .split(",")
              .map((image) => (
                <img
                  key={image}
                  src={`http://localhost:9000/images/${image}`}
                  alt={list.gbPostTitle}
                />
              ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>
        <div className="detail-text">
          <p>{list.gbPostContent}</p>
        </div>
        <div className="comment-container">
        <div className="comment-view">
            {filteredComments.map(comment => (
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
                    <button onClick={() => {setReplyInput(!replyInput)}}>
                      {replyInput ? ('답글달기 취소') : ('답글달기')}
                    </button>
                    {loginMember && list &&
                     (
                      (loginMember.memberNo === list.memberNo && 
                      (loginMember.memberNo === comment.memberNo || comment.memberName.startsWith('익명'))) || (loginMember.memberNo === comment.memberNo) ) && (
                        <button onClick={() => commentDelete(comment.gbCommentNo)}>삭제</button>
                      )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="comment-write">
          <p>{loginMember ? loginMember.memberName : `익명${anonymousCount}`}</p>
            <input type="text" placeholder="댓글을 남겨보세요" value={content} onChange={(e) => setContent(e.target.value)} />
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={commentWrite}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
