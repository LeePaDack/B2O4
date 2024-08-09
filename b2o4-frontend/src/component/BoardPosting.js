import React, { useState, useContext } from "react";
import axios from 'axios';
import MyPageContext from './MyPageContext'; // MyPageContext를 불러옴

const BoardPosting = () => {
    const { loginMember } = useContext(MyPageContext); // 로그인 정보
    console.log("로그인한 사람 정보", loginMember);
    const [posting, setPosting] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');

    // addPost 함수 수정: boardTitle, boardContent, memberNo 정보를 포함한 객체를 전송
    const addPost = async (board) => {
        try {
            const res = await axios.post('http://localhost:9000/boards', board);
            setPosting([...posting, res.data]);
        } catch (err) {
            console.error("Error adding post:", err);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // 게시글 정보와 함께 loginMember의 memberNo 정보를 추가하여 전달
        const boardData = {
            boardTitle: boardTitle,
            boardContent: boardContent,
            memberNo: loginMember.memberNo
        };
        console.log("보낼 데이터", boardData);
        addPost(boardData);
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
