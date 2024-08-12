import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import boardMainPagination from './BoardMainPagiNation';
import '../css/BoardMain.css';
import Table from 'react-bootstrap/Table';

const BoardMain = ({}) => {
    const navigate = useNavigate();
    const [boards,setBoards] = useState([]);
    useEffect(() => {
        BoardPostList();
      }, []);
    
      const BoardPostList = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
      };
      console.log("board DB 정보 불러오기" , boards);

      const handleRowClick = (board) => {
        navigate(`/boardContent/${board.boardNo}`, { state: { board: board } });
      };

    return (
        <div>
            <table className="board-table">
                <h2>고객센터</h2>
                <Table striped bordered hover size="sm" className="board-Table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map(board => (
                    <tr key={board.boardNo} onClick={ () => handleRowClick(board)} className="content-table">
                        <td style={{padding: "10px"}}>{board.boardNo}</td>
                        <td>{board.boardTitle}</td> {/* 클릭시 글로 이동 BoardContent.js */}
                        <td>{board.memberName || 'No name available'}</td>
                        <td>{board.boardCreateDate}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </table>
            <button className="posting-button" onClick={() => navigate('/boardPosting')}>문의하기</button> {/* 클릭시 글쓰기로 이동 BoardPosting.js */}
        </div>


    )

}

export default BoardMain;
