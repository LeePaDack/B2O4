import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const BoardUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const board = location.state.board;

    useEffect(() => {
        BoardUpdateReady();
        if (board) {
            setBoardTitle(board.boardTitle);
            setBoardContent(board.boardContent);
        }
    }, [board]);

    const BoardUpdateReady = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };

    const UpdatePost = async (e) => {
        e.preventDefault();
        const updatedBoard = {
            ...board,
            boardTitle,
            boardContent,
        };
        await axios.put(`/boards?boardNo=${board.boardNo}`, updatedBoard);
        setBoards(boards.map(b => (b.boardNo === board.boardNo ? updatedBoard : b)));
        navigate("/boardMain");
    }

    const deletePost = async (e) => {
        e.preventDefault();
        await axios.delete(`/boards?boardNo=${board.boardNo}`);
        setBoards(boards.filter(b => b.boardNo !== board.boardNo));
        navigate("/boardMain");
    }

    return (
        <div>
            <h1>고객센터</h1>
            <form onSubmit={UpdatePost}>
                <div>
                    <label>제목: </label>
                    <input 
                        type="text" 
                        value={boardTitle} 
                        onChange={(e) => setBoardTitle(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>내용: </label>
                    <input 
                        type="text" 
                        value={boardContent} 
                        onChange={(e) => setBoardContent(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">글 수정 완료</button>
                <button type="button" onClick={deletePost}>글 삭제 하기</button>
            </form>
        </div>
    )
}

export default BoardUpdate;
