import logo from "./logo.svg";
import "./App.css";
import MyPage from "./MyPage/MyPage";
import MyPageContext from "./MyPage/MyPageContext";
import { useState } from "react";
import Login from "./MyPage/testLogin";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StadiumsInfo from "./Review/StadiumMain";
import MembersInfo from "./Review/MemberMain";
import StadiumDetail from "./Review/StadiumDetail";
import MemberDetail from "./Review/MemberDetail";

function App() {
  const [loginMember, setLoginMember] = useState(null);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StadiumsInfo />} />
          <Route path="/memberInfo" element={<MembersInfo/>}/>
          <Route path="/stadiumdetail/:stadiumNo" element={<StadiumDetail/>}/>
          <Route path="/memberdetail/:memberNo" element={<MemberDetail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
