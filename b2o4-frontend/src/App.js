import './App.css';
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
import { useEffect, useState } from 'react';
import MyPageContext from './component/MyPageContext.js';

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
        </Routes>
        <Footer/>
      </Router>
      </MyPageContext.Provider>
    </div>
  );
}

export default App;