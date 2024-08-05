import React from "react";
import { useLocation } from "react-router-dom";

const MemberDetail = () => {

    const location = useLocation();
    const list = location.state.list;
    console.log(location);

    return (
        <div className="memberdetail-container">
            <div className="memberdetail-content">
                
            </div>
        </div>
    )
}

export default MemberDetail;