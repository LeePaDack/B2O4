import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../css/GalleryBoard.css";
import Button from "react-bootstrap/esm/Button";

const GalleryDetail = () => {
  const location = useLocation();
  const list = location.state.list;


  /* 삭제하고 싶은 번호를 가지고 삭제 */
  const deleteGallery = async (gbPostNo) => {
    await axios.delete(`/gallery/${gbPostNo}`);
 }

  return (
    <div className="detail-container">
      <div className="button-container">
        <Button variant="secondary">수정</Button>
        <Button variant="secondary" onClick={deleteGallery}>삭제</Button>
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
          <p>{list.gbPostContent}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
