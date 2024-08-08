import './App.css';
import BoardMain from './component/boardMain.js';
import BoardPosting from './component/boardPosting.js';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BoardContent from './component/boardContent.js';
import StadiumList from './component/stadiumList.js';
import BoardUpdate from './component/boardUpdate.js';
import StadiumDetail from './component/stadiumDetail.js';
import ReservationStadium from './component/reservationStadium.js';
import Header from './component/Layout/Header.js';
import Footer from './component/Layout/Footer.js';
import Login from './component/Login.js';
import { useState } from 'react';
import MyPageContext from './component/MyPageContext.js';

function App() {
  const [loginMember, setLoginMember] = useState(null);

  return (
    <div>
      <h1>메인</h1>

      <MyPageContext.Provider value={{loginMember, setLoginMember}}>
      <Router>
      <Header/>
        <Link to='/boardMain'>고객센터</Link>
        <br></br>
        <Link to='/StadiumList'>구장정보</Link>
        <br></br>
        <Link to='/login'>로그인</Link>
        <Link to='/'><button>돌아가기</button></Link>
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
      {loginMember && (
          <div className="input-login">
            <p>{loginMember.memberId}님 환영합니다.</p>
          </div>
          )}
      </MyPageContext.Provider>
    </div>
  );
}

export default App;