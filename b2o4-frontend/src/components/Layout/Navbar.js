import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/galleryUpload'>갤러리 등록</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;