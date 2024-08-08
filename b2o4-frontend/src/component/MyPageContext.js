import React, {createContext, useState} from "react";

const MyPageContext = createContext({
    loginMember: null,
    setLoginMember: () => {},
    reviewList: [],
    setReviewList: () => {},
});


export default MyPageContext;