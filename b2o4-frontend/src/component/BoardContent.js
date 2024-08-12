import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/BoardContent.css';

const BoardContent = () => {
    
    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const board = location.state.board;
    const navigate = useNavigate();

    console.log("location",location);

    useEffect(() => {
        BoardPostList();
    }, []);

    const BoardPostList = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };

    const handleUpdateClick = () => {
        navigate(`/boardUpdate/${board.boardNo}`, { state: { board: board } });
    };

    const handleBackClick = () => {
        navigate("/boardMain");
    };

    return (
        <div>
            <button onClick={handleUpdateClick} className="update-button">수정하기</button> {/* 이 글의 수정하기로 가야함 */}
            {/* 로그인 세션으로 본인 글일 경우에만 뜨게 하기 */}
            <button onClick={handleBackClick} className="back-button">돌아가기</button>
            <table className="boardContent-table">
                <thead>
                    {/* <tr>댓글</tr> 나중에 구현 */} 
                </thead>
                <tbody className="board-tbody">
                        <tr>
                            <div className="content-top">
                                <td className="board-title">{board.boardTitle}</td>
                                <td className="board-name">{board.memberName}</td>
                            </div>
                        </tr>
                        <td className="board-content">{board.boardContent}</td>
                </tbody>    
                
            </table>
        </div>
    )

}

export default BoardContent;
