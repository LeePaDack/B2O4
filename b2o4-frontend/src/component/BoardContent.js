import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/BoardContent.css';
import MyPageContext from "./MyPageContext";

const BoardContent = () => {
    
    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const [comment, setComment] = useState('');
    const board = location.state.board;
    const navigate = useNavigate();

    console.log("location",location);

    useEffect(() => {
        BoardComment();
      }, []);

    // boardComment 정보 가져오기
    const BoardComment = async() => {
        const res = await axios.get('/boards/comment');
        setComment(res.data);
    };
    console.log("comment 불러오기" , comment);


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
            alert("수정에 실패했습니다.");
        }
        
    };

    const handleBackClick = () => {
        navigate("/boardMain");
    };

    // 댓글 작성하기
    const adminBoardComment = () => {
        axios.post(`http://localhost:9000/`)
    };

    // 작성되어있다면 그 댓글 불러오기
    const getAdminComment = () => {

    }

    console.log("loginMember", loginMember);
    console.log("board", board);

    if(!loginMember){
        return;
    }
    return (
        <div>
            <img className="board-top-img" src="../images/5346ae379c2ae.png"/>
            <div className="board-content-table">
                {loginMember.memberNo === board.memberNo &&
                <button onClick={handleUpdateClick} className="update-button">수정하기</button>}
                <button onClick={handleBackClick} className="back-button">돌아가기</button>
                <table className="boardContent-table">
                    <tbody className="board-tbody">
                            <tr>
                                <div className="content-top">
                                    <td className="board-title">{board.boardTitle}</td>
                                    <td className="board-name">{board.memberName}</td>
                                </div>
                            </tr>
                            <td className="board-content">
                                {board.boardContent}
                            </td>
                            <input 
                                className="admin-board-comment" 
                                type="text" 
                                disabled={loginMember.memberType !== 'A'}
                                placeholder="문의 답변"
                                value={comment.commentContent}
                            />
                
                            <button className="admin-post-board-comment" onClick={adminBoardComment}>작성하기</button>
                    </tbody>    
                </table>
            </div>
        </div>
    )

}

export default BoardContent;