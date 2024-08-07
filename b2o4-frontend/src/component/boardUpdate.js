import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";

const BoardUpdate = () => {

    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const board = location.state.board;

    console.log("location",location);

    useEffect(() => {
        BoardUpdateReady();
    }, []);

    const BoardUpdateReady = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };



    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');


    const UpdatePost = async (boardNo) => {
        await axios.put(`/boards?boardNo=${boardNo}`);
        setBoards(boards.map(b=> (b.boardNo === board.boardNo ? board : b)));
    }

    const deletePost = async (boardNo) => {
        await axios.delete(`/boards?boardNo=${boardNo}`);
        setBoards(boards.filter(board => board.boardNo !== boardNo));
    } 

    return (
        <div>
            <h1> 고객센터 </h1>
            <form>
                <div>
                    <label>제목 : </label>
                    <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} required/>
                </div>
                <div>
                    <label>내용 : </label>
                    <input type="text" value={board.boardContent} onChange={(e) => setBoardContent(e.target.value)} required/>
                </div>
                <Link to={"/boardMain"}><button onClick={() =>UpdatePost(board.boardNo)} type="submit">글 수정 완료</button></Link> 
                <Link to={"/boardMain"}><button onClick={() => deletePost(board.boardNo)}>글 삭제 하기</button></Link>
            </form>
        </div>
    )

}

export default BoardUpdate;