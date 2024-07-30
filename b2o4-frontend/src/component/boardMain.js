import React from "react";
import { Link } from "react-router-dom";

const BoardMain = ({boards}) => {

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
                    {boards?.map(board => (
                        <tr key={board.boardNo}>
                            <td>{board.boardNo}</td>
                            <td>{board.boardTitle}</td> {/* 클릭시 글로 이동 boardContent.js */}
                            <td>{board.memebrNo}</td> {/* memberName 으로 가져와야할 부분 */}
                            <td>{board.boardCreateDate}</td>
                        </tr>
                    ))}
                     
                </tbody>
                <Link to={"/BoardPosting"}><button>문의하기</button></Link> {/* 클릭시 글쓰기로 이동 boardPosting.js */}

            </table>
    )

}

export default BoardMain;