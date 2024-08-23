<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./component/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";

import GoogleMap from './component/GoogleMap';

=======
import './App.css';
import GalleryUpload from './components/Gallery/GalleryUpload.js';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import GalleryBoard from './components/Gallery/GalleryBoard.js';
import Login from './components/Login/Login.js';
import MyPageContext from './components/MyPageContext.js';
import { useEffect, useState } from 'react';
import GalleryDetail from './components/Gallery/GalleryDetail.js';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Layout/Header.js'
import FindId from './components/Login/FindId.js';
import FindPw from './components/Login/FindPw.js';
import Footer from './components/Layout/Footer.js';
import GalleryUpdate from './components/Gallery/GalleryUpdate.js'
import PasswordChange from './components/Login/PasswordChange.js';
import NaverSignup from './components/Login/NaverSignup.js';
import KakaoRedirectPage from './components/Login/KakaoRedirectPage.js'; 
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003

function App() {

  const [loginMember, setLoginMember] = useState(null);

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
<<<<<<< HEAD
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/members/signup" element={<Signup />}></Route>

        <Route path='/members/GoogleMap' element={<GoogleMap />} />


      </Routes>
      <Footer />
    </Router>
=======
    <MyPageContext.Provider value={{loginMember, setLoginMember}}> 
      <Router>
      <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/galleryBoard' element={<GalleryBoard />} />
          <Route path='/galleryBoard/:gbpostNo' element={<GalleryDetail />} />
          <Route path='/galleryUpload' element={<GalleryUpload />} />
          <Route path='/findId' element={<FindId />} />
          <Route path='/findPw' element={<FindPw />} />
          <Route path='/galleryUpdate/:gbPostNo' element={<GalleryUpdate />} />
          <Route path='/passwordChange' element={<PasswordChange />} />       
          <Route path='/signup/naver' element={<NaverSignup />} />
          <Route path='/oauth/redirected/kakao' element={<KakaoRedirectPage />} />
        </Routes>
        <Footer />
      </Router>
    </MyPageContext.Provider>
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
  );
}

export default App;