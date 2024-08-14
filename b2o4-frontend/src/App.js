import logo from "./logo.svg";
import "./App.css";
import MyPage from "./MyPage/MyPage";
import MyPageContext from "./MyPage/MyPageContext";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MembersMain from "./Review/MemberMain";
import StadiumDetail from "./Review/StadiumDetail";
import MemberDetail from "./Review/MemberDetail";
import StadiumReviewUpload from "./Review/StadiumReviewUpload";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import MemberReviewUpload from "./Review/MemberReviewUpload";
import StadiumsMain from "./Review/StadiumMain";

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
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/stadiumInfo" element={<StadiumsMain />}/>
          <Route path="/memberInfo" element={<MembersMain/>}/>
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
