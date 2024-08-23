<<<<<<< HEAD
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

=======
import './App.css';
import { useEffect, useState } from 'react';
import BoardMain from './component/BoardMain.js';
import BoardPosting from './component/BoardPosting.js';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BoardContent from './component/BoardContent.js';
import StadiumList from './component/StadiumList.js';
import BoardUpdate from './component/BoardUpdate.js';
import StadiumDetail from './component/StadiumDetail.js';
import ReservationStadium from './component/ReservationStadium.js';
import Header from './component/Layout/Header.js';
import Footer from './component/Layout/Footer.js';
import Login from './component/Login.js';
import MyPageContext from './component/MyPageContext.js';
import { PaymentCheckoutPage } from './component/payment/PaymentCheckoutPage.js';
import { PaymentSuccessPage } from './component/payment/PaymentSuccessPage.js';
import { PaymentFailPage } from './component/payment/PaymentFailPage.js';

function App() {
  const [loginMember, setLoginMember] = useState(null);


>>>>>>> leegyejun-board
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
<<<<<<< HEAD
  
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
=======

  return (
    <div>


      <MyPageContext.Provider value={{loginMember, setLoginMember}}>
      <Router>
      <Header/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='stadiumList' element={<StadiumList/>}/>
          <Route path='/stadiumDetail/:stadiumNo' element={<StadiumDetail/>}/>
          <Route path='/boardPosting' element={<BoardPosting/>}/>
          <Route path='/boardUpdate/:boardNo' element={<BoardUpdate/>}/>
          <Route path='/boardMain' element={<BoardMain/>}/>
          <Route path='/boardContent/:boardNo' element={<BoardContent/>}/>
          <Route path='/reservationStadium/:stadiumNo' element={<ReservationStadium/>}/>
          <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/fail" element={<PaymentFailPage />} />
        </Routes>
        <Footer/>
      </Router>
      </MyPageContext.Provider>
    </div>
>>>>>>> leegyejun-board
  );
}

export default App;