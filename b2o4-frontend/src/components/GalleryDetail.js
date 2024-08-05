import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";


const GalleryDetail = () => {

    const location = useLocation();
    const list = location.state.list;

    return(
        <div>
            <h1>{list.gbpostTitle}</h1>
            <h1>{list.gbpostContent}</h1>
            <img src={`${process.env.PUBLIC_URL}/images/galleryBoard/${list.gbimages}`} />
        </div>
    )
}

export default GalleryDetail;