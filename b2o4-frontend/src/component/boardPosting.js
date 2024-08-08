import React, { useState, useContext } from "react";
import axios from 'axios';
import MyPageContext from './MyPageContext'; // MyPageContext를 불러와야 합니다.

const BoardPosting = () => {
    const { loginMember } = useContext(MyPageContext); // 로그인 정보를 가져옵니다.
    const [posting, setPosting] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');

    const addPost = async (board) => {
        try {
            const res = await axios.post('/boards', board);
            setPosting([...posting, res.data]);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // loginMember 정보를 게시글 정보와 함께 전달합니다.
        addPost({ boardTitle, boardContent, loginMember });
        setBoardTitle('');
        setBoardContent('');
    }

    return (
        <div>
            <h1> 고객센터 </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목 : </label>
                    <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} required />
                </div>
                <div>
                    <label>내용 : </label>
                    <input type="text" value={boardContent} onChange={(e) => setBoardContent(e.target.value)} required />
                </div>
                <button type="submit">글 작성 완료</button>
            </form>
        </div>
    )
}

export default BoardPosting;