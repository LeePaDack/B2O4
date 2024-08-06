import logo from "./logo.svg";
import "./App.css";
import MyPage from "./MyPage/MyPage";
import MyPageContext from "./MyPage/MyPageContext";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StadiumsInfo from "./Review/StadiumMain";
import MembersInfo from "./Review/MemberMain";
import StadiumDetail from "./Review/StadiumDetail";
import MemberDetail from "./Review/MemberDetail";
import StadiumReviewUpload from "./Review/StadiumReviewUpload";
import Login from "./component/Login";

function App() {
  const [loginMember, setLoginMember,reviewList, setReviewList] = useState(null);
  return (
    <MyPageContext.Provider value={{loginMember, setLoginMember,reviewList, setReviewList}}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/stdiumInfo" element={<StadiumsInfo />} />
          <Route path="/memberInfo" element={<MembersInfo/>}/>
          <Route path="/stadiumdetail/:stadiumNo" element={<StadiumDetail/>}/>
          <Route path="/memberdetail/:memberNo" element={<MemberDetail/>}/>
          <Route path="/stadiumReviewUpload" element={<StadiumReviewUpload/>}/>
        </Routes>
      </Router>
    </MyPageContext.Provider>
  );
}

export default App;
