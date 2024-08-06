import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const GalleryBoard = () => {

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
    );
}

export default GalleryBoard;