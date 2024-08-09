import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BoardContent = () => {
    
    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const board = location.state.board;

    console.log("location",location);

    useEffect(() => {
        BoardPostList();
    }, []);

    const BoardPostList = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };

    return (
        <table>
            <thead>
                <tr>게시글 제목</tr>
                <tr>작성자 </tr>
                <br/>
                <tr>게시글 내용</tr>
                {/* <tr>댓글</tr> 나중에 구현 */} 
            </thead>
            <tbody>
                    <tr>
                        <td>{board.boardTitle}</td>
                        <td>{board.memberName}</td>
                        <td>{board.boardContent}</td>
                    </tr>
            </tbody>
            <Link to={`/boardUpdate/${board.boardNo}` }state={{board: board}}><button>수정하기</button></Link> {/* 이 글의 수정하기로 가야함 */}
            {/* 로그인 세션으로 본인 글일 경우에만 뜨게 하기 */}
            <Link to={"/boardMain"}><button>돌아가기</button></Link>
        </table>
    )

}

export default BoardContent;
