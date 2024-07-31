import React, { useState } from "react";

const GalleryUpload = () => {

    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[images, setImages] = useState('');

    const[result, setResult] = useState('');

    const 등록하기 = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('GBPostTitle', title);
        formData.append('GBPostContent', content);
        formData.append('GBImages', images);
        

        fetch("/gallery", {
            method : "POST",
            body : formData
        })
        .then(response => response.text())
        .then(result => {
            console.log("" + result)
            if(Number(result) > 0) {
                setResult('등록 성공!');
                setTitle('');
                setContent('');
                setImages('');
            } else {
                setResult('등록 실패!');
            }
        })
    }

    const handleImage = (e) => {
        const files = e.target.files[0];
        setImages(files);

    }

    return(
        <div className="gallery-container">
            <form>
                <label htmlFor="title">제목 : </label>
                <input
                id="title"
                type="text"
                onChange={e => {setTitle(e.target.value)}}
                value={title}
                required
                />

                <label htmlFor="content">내용 : </label>
                <textarea
                id="content"
                onChange={e => {setContent(e.target.value)}}
                value={content}
                required
                ></textarea>

                <label htmlFor="imgSelect">사진</label>
                <input
                id="imgSelect"
                type="file"
                accept="image/*"
                onChange={handleImage}
                multiple
                />
                <button onClick={등록하기}>등록하기</button>
            </form>
            <hr/>
            <h3>{result}</h3>           
        </div>
    );
}
export default GalleryUpload;
