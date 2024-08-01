import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const BoardMain = ({}) => {
    const [boards,setBoards] = useState([]);
    useEffect(() => {
        BoardPostList();
      }, []);
    
      const BoardPostList = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
      };
      console.log("board DB 정보 불러오기" , boards);
    return (
            <table>
                <thead>
                    <tr>
                        <th>게시글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map(board => (
                        <tr key={board.boardNo}>
                            <td>{board.boardNo}</td>
                            <Link to={"/boardContent/" + board.boardNo}><td>{board.boardTitle}</td></Link> {/* 클릭시 글로 이동 boardContent.js */}
                            <td>{board.memberName || 'No name available'}</td>
                            <td>{board.boardCreateDate}</td>
                        </tr>
                    ))}
                     
                </tbody>
                <Link to="/BoardPosting"><button>문의하기</button></Link> {/* 클릭시 글쓰기로 이동 boardPosting.js */}

            </table>
    )

}

export default BoardMain;