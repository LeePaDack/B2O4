import {createContext} from "react";

const MyPageContext = createContext({
    loginMember: null,
    setLoginMember: () => {}
});

export default MyPageContext;