import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/BoardContent.css';
import MyPageContext from "./MyPageContext";

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

    const { loginMember } = useContext(MyPageContext);

    const handleUpdateClick = () => {
        if(board.memberNo == loginMember.memberNo){
            navigate(`/boardUpdate/${board.boardNo}`, { state: { board: board } });
        } else {
            alert("ASD");
        }
        
    };

    const handleBackClick = () => {
        navigate("/boardMain");
    };

    if(!loginMember){
        return;
    }
    return (
        <div className="board-content-table">
            {loginMember.memberNo === board.memberNo &&
            <button onClick={handleUpdateClick} className="update-button">수정하기</button>}
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
