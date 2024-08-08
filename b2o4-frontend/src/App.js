import logo from "./logo.svg";
import "./App.css";
import MyPage from "./MyPage/MyPage";
import MyPageContext from "./MyPage/MyPageContext";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StadiumsInfo from "./Review/StadiumMain";
import MembersInfo from "./Review/MemberMain";
import StadiumDetail from "./Review/StadiumDetail";
import MemberDetail from "./Review/MemberDetail";
import StadiumReviewUpload from "./Review/StadiumReviewUpload";
import Login from "./component/Login";
import Header from "./component/Layout/Header";
import Footer from "./component/Layout/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import MemberReviewUpload from "./Review/MemberReviewUpload";

function App() {

  const [loginMember, setLoginMember] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if(savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  },[]);

  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);
  return (
    <MyPageContext.Provider value={{loginMember, setLoginMember,reviewList, setReviewList}}>
      <Router>
       <Header/>
        <Routes>
          <Route path="/header" element={<Header/>}/>
          <Route path="/footer" element={<Footer/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/stadiumInfo" element={<StadiumsInfo />} />
          <Route path="/memberInfo" element={<MembersInfo/>}/>
          <Route path="/stadiumdetail/:stadiumNo" element={<StadiumDetail/>}/>
          <Route path="/memberdetail/:memberNo" element={<MemberDetail/>}/>
          <Route path="/stadiumReviewUpload" element={<StadiumReviewUpload/>}/>
          <Route path="/memberReviewUpload" element={<MemberReviewUpload/>}/>
        </Routes>
      </Router>
      <Footer/>
    </MyPageContext.Provider>
  );
}

export default App;
