import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoardContent = () => {
    
    const [boards, setBoards] = useState([]);

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
                <tr>작성자</tr>
                <br/>
                <tr>게시글 내용</tr>
                {/* <tr>댓글</tr> 나중에 구현 */} 
            </thead>
            <tbody>
                {boards.map(board => (
                    <tr key={board.boardNo}>
                        <td>{board.boardTitle}</td>
                        <td>{board.memberName}</td>
                        <td>{board.boardContent}</td>
                    </tr>
                ))}
            </tbody>
            <button>수정하기</button> 
            {/* 로그인 세션으로 본인 글일 경우에만 뜨게 하기 */}
            <Link to={"/"}><button>돌아가기</button></Link>
        </table>
    )

}

export default BoardContent;