import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const GalleryBoard = () => {

    const [loginMember, setLoginMember] = useState(null);

    const [GBList, setGBList] = useState([]);

    const boardList = async () => {
        const response = await axios.get('/gallery/posts');
        setGBList(response.data);
    }

    useEffect(() => {
        boardList();
        console.log("GBList : ", GBList);
    },[GBList]);


    return(
        <div className="galletyBoard-container">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>CreateDate</th>
                    </tr>
                </thead>
                <tbody>
                    {GBList.map(list => (
                        <tr key={list.gbPostNo}>
                            <Link to={`/galleryBoard/${list.gbPostNo}`} state={{list : list}}>
                            <td>{list.gbPostNo}</td>
                            <td>{list.gbPostTitle}</td>
                            <td>{list.gbPostCreateDate}</td>
                            </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loginMember && (
                <Button variant="secondary" href="/galleryUpload">글쓰기</Button>
            )}
            
        </div>
    );
}

export default GalleryBoard;