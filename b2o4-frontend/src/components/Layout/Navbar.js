import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/galleryUpload'>갤러리 등록</Link></li>
                <li><Link to='/galleryBoard'>갤러리 게시판</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
            <hr />
        </nav>
    )
}
export default Navbar;