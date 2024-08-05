import React, { useState } from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

const BoardPosting = (boardNo) => {
    const [posting, setPosting] = useState([]);

    const addPost = async(board) => {
        const res = await axios.post('/boards', board);
        setPosting([...posting], res.data);
      }
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost({boardTitle,boardContent});
    }

    const deletePost = async (boardNo) => {
        await axios.delete(`/boards?boardNo=${boardNo}`);
        setPosting(posting.filter(board => board.boardNo !== boardNo));
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
                <Link to={"/BoardMain"}><button type="submit">글 수정 완료</button></Link> 
                <button onClick={() => deletePost(posting.boardNo)}>글 삭제 하기</button>
            </form>
        </div>
    )

}

export default BoardPosting;