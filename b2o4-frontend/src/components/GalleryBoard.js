import React, { useEffect, useState } from "react";
import axios from 'axios';

const GalleryBoard = () => {

    const [GBList, setGBList] = useState([]);

    const boardList = async () => {
        const response = await axios.get('/gallery');
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
                    <tr key={list.gbpostNo}>
                        <td>{list.gbpostNo}</td>
                        <td>{list.gbpostTitle}</td>
                        <td>{list.gbpostCreateDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GalleryBoard;