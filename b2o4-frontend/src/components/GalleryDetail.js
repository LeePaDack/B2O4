import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";


const GalleryDetail = () => {

    const location = useLocation();
    const list = location.state.list;

    return(
        <div>
            <h1>{list.gbPostTitle}</h1>
            <h1>{list.gbPostContent}</h1>
            {list.gbImages ? list.gbImages.split(',').map(image => (
              <img key={image} src={`http://localhost:9000/images/${image}`} alt={list.gbPostTitle} />
            )) : <p>이미지가 없습니다.</p>}
        </div>
    )
}

export default GalleryDetail;