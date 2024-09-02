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

import UsedItemBoard from './components/UsedItem/UsedItemBoard.js';
import UsedItemUpload from './components/UsedItem/UsedItemUpload.js';
import UsedItemDetail from './components/UsedItem/UsedItemDetail.js';
import UsedItemUpdate from './components/UsedItem/UsedItemUpdate.js';
import GoodsPaymentDeliveryInfo from './components/GoodsPaymentDeliveryInfo.js';
import GoodsPaymentSuccessPage from './components/GoodsPaymentSuccessPage.js';
import GoodsPaymentFailPage from './components/GoodsPaymentFailPage.js';

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

          <Route path="/goodsShop" element={<GoodsShop />} /> 
          <Route path="/goodsDetail/:goodsNo" element={<GoodsDetail  loginMember={loginMember}/>} />
          <Route path="/shoppingBasket/" element={<ShoppingBasket  loginMember={loginMember}/>} />
          {/* <Route path="/DeliveryInfo/" element={<DeliveryInfo  loginMember={loginMember} /> } />  */}
          <Route path="/payment/checkout" element={<GoodsPaymentDeliveryInfo loginMember={loginMember} />} />  
          <Route path='/payment/success' element={<GoodsPaymentSuccessPage loginMember={loginMember}/>} />
          <Route path='/payment/fail' element={<GoodsPaymentFailPage loginMember={loginMember} />} />

          <Route path='/usedItemBoard' element={<UsedItemBoard loginMember={loginMember} />} />
          <Route path='/usedItem/upload' element={<UsedItemUpload loginMember={loginMember} />} />
          <Route path='/usedItem/:usedItemNo' element={<UsedItemDetail loginMember={loginMember} />} />
          <Route path='/usedItem/edit/:usedItemNo' element={<UsedItemUpdate loginMember={loginMember} />} />
        </Routes>
        <Footer />
      </Router>
    </MyPageContext.Provider>
  );
}

export default App;