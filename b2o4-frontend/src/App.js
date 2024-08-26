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

import GoodsShop from "./components/GoodsShop.js";
import GoodsDetail from "./components/GoodsDetail.js";
import ShoppingBasket from "./components/ShoppingBasket.js";

import Footer from './components/Layout/Footer.js';
import GalleryUpdate from './components/Gallery/GalleryUpdate.js'
import DeliveryInfo from './components/DeliveryInfo.js';

import PasswordChange from './components/Login/PasswordChange.js';
import NaverSignup from './components/Login/NaverSignup.js';
import KakaoRedirectPage from './components/Login/KakaoRedirectPage.js';

function App() {

  const [loginMember, setLoginMember] = useState(null);
  const [basketList, setBasketList] = useState([]);

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
    <MyPageContext.Provider value={{loginMember, setLoginMember,basketList, setBasketList}}> 
      <Router>
      <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/galleryBoard' element={<GalleryBoard />} />
          <Route path='/galleryBoard/:gbpostNo' element={<GalleryDetail />} />
          <Route path='/galleryUpload' element={<GalleryUpload />} />
          <Route path='/findId' element={<FindId />} />
          <Route path='/findPw' element={<FindPw />} />
          <Route path='/galleryUpdate' element={<GalleryUpdate />} />
          <Route path='/passwordChange' element={<PasswordChange />} />       
          <Route path='/signup/naver' element={<NaverSignup />} />
          <Route path='/oauth/redirected/kakao' element={<KakaoRedirectPage />} />

          <Route path="/goodsShop" element={<GoodsShop />} /> 
          <Route path="/goodsDetail/:goodsNo" element={<GoodsDetail  loginMember={loginMember}/>} />
          <Route path="/shoppingBasket/" element={<ShoppingBasket  loginMember={loginMember}/>} />
          <Route path="/DeliveryInfo/" element={<DeliveryInfo  loginMember={loginMember} /> } />

        </Routes>
        <Footer />
      </Router>
    </MyPageContext.Provider>
  );
}

export default App;