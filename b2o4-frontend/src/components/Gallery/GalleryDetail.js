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

  

  /* 삭제하고 싶은 번호를 가지고 삭제 */
  const deleteGallery = async (gbPostNo) => {
    try{
      const response = await axios.delete(`/gallery/${gbPostNo}`);
      alert("삭제되었습니다.");
      navigate('/galleryBoard');
    } catch(error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  }


  return (
    <div className="detail-container">
      <div className="button-container">
        {loginMember && list && loginMember.memberNo === list.memberNo && (
          <>
          <Link to="/galleryUpdate" >
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
        
      </div>
    </div>
  );
};

export default GalleryDetail;
