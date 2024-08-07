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

function App() {


  return (
    <div>
      <h1>메인</h1>


      <Router>
      <Header/>
        <Link to='/boardMain'>고객센터</Link>
        <br></br>
        <Link to='/StadiumList'>구장정보</Link>
        <br></br>
        <Link to='/'><button>돌아가기</button></Link>
        <Routes>
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

    </div>
  );
}

export default App;