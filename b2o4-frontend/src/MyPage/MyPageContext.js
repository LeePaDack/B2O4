import React, {createContext} from "react";

const initialState = {
    reviewList: [],
    setReviewList: () => {},
    loginMember: null
};

const MyPageContext = createContext(initialState);

export default MyPageContext;