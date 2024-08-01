import React, { useState } from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

const BoardPosting = () => {
    const [posting, setPosting] = useState([]);

    const addPost = async(board) => {
        const res = await axios.post('/boards', board); // controller PostMapping 으로 전달하는 유저 정보
        // ...users 기존에 작성한 유저 목록에 유저 데이터 하나를 추가
        setPosting([...posting], res.data);
      }
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost({boardTitle,boardContent});
    }

    return (
        <div>
            <h1> 고객센터 </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목 : </label>
                    <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} required/>
                </div>
                <div>
                    <label>내용 : </label>
                    <input type="text" value={boardContent} onChange={(e) => setBoardContent(e.target.value)} required/>
                </div>
                <button type="submit">글 작성 완료</button>
                <Link to={"/BoardMain"}><button type="submit">글 작성 완료</button></Link> 
            </form>
        </div>
    )

}

export default BoardPosting;