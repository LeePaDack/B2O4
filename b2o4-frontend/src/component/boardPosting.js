import React, { useState } from "react";
import {Link} from "react-router-dom";

const BoardPosting = () => {
    const [posting, setPosting] = useState([]);
    


    return (
        <div>
            <h1> 고객센터 </h1>
            <Link to={"/BoardMain"}><button>글 작성 완료</button></Link> 
        </div>
    )

}

export default BoardPosting;