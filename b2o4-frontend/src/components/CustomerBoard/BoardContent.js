import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/BoardContent.css';
import MyPageContext from "../MyPageContext";

const BoardContent = () => {
    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const [commentContent, setCommentContent] = useState(''); // 변수명을 더 명확하게 수정
    const [comments, setComments] = useState([]); // 댓글 리스트를 저장할 상태 추가
    const board = location.state.board;
    const navigate = useNavigate();

    useEffect(() => {
        BoardComment();
    }, []);

    // boardComment 정보 가져오기
    const BoardComment = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/boards/comment/${board.boardNo}`);
            setComments(res.data);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };
    console.log("comment 불러오기", comments); // 전체 댓글 리스트 확인

    useEffect(() => {
        BoardPostList();
    }, []);

    const BoardPostList = async () => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };

    const { loginMember } = useContext(MyPageContext);

    const handleUpdateClick = () => {
        if (board.memberNo === loginMember.memberNo) {
            navigate(`/boardUpdate/${board.boardNo}`, { state: { board: board } });
        } else {
            alert("수정에 실패했습니다.");
        }
    };

    const handleBackClick = () => {
        navigate("/boardMain");
    };

    if (!loginMember) {
        return;
    }
    console.log("board 정보", board);
    console.log("memberNo", loginMember.memberNo);
    
    const 전달데이터 = {
        commentContent: commentContent, // 댓글 내용
        memberNo: loginMember.memberNo,  // 로그인한 사용자 번호
        boardNo: board.boardNo           // 게시글 번호
    };

    // 댓글 작성하기
    const adminBoardComment = () => {
        axios.post(`http://localhost:9000/boards/comment`, 전달데이터) // URL 수정
            .then((response) => {
                alert("댓글 작성 완료");
                setCommentContent(''); // 댓글 작성 후 입력 필드 초기화
                BoardComment(); // 댓글 리스트 새로고침
            })
            .catch((e) => {
                console.log("실패", e);
                alert("댓글 작성 실패");
            });
    };

    console.log("loginMember", loginMember);
    console.log("board", board);

    return (
        <div>
            <img className="board-top-img" src="../images/5346ae379c2ae.png" alt="Board Top"/>
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
                            value={commentContent} // 상태 연결
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <button className="admin-post-board-comment" onClick={adminBoardComment}>작성하기</button>

                        {/* 댓글 목록 표시 */}
                        <div className="comments-section">
                            {comments.map(comment => (
                                <div key={comment.boardNo} className="comment-item">
                                    <small>관리자 : {comment.memberName}</small>
                                    <p>{comment.commentContent}</p>
                                </div>
                            ))}
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BoardContent;