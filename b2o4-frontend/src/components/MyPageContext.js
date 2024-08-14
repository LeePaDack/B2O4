import React, { createContext } from "react";

const MyPageContext = createContext({
  loginMember: null,
  setLoginMember: () => {},
  basketList: [],
  setBasketList: () => {},
});

export default MyPageContext;
