import './App.css';
import GalleryUpload from './components/GalleryUpload.js';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import GalleryBoard from './components/GalleryBoard.js';
import Login from './components/Login.js';
import MyPageContext from './components/MyPageContext.js';
import { useState } from 'react';
import GalleryDetail from './components/GalleryDetail.js';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Layout/Header.js'

function App() {

  const [loginMember, setLoginMember] = useState(null);

  return (
    <MyPageContext.Provider value={{loginMember, setLoginMember}}> 
      <Router>
      <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/galleryBoard' element={<GalleryBoard />} />
          <Route path='/galleryBoard/:gbpostNo' element={<GalleryDetail />} />
          <Route path='/galleryUpload' element={<GalleryUpload />} />
        </Routes>
      </Router>
      {loginMember && (
          <div className="input-login">
            <p>{loginMember.memberId}님 환영합니다.</p>
          </div>
          )}
    </MyPageContext.Provider>
  );
}

export default App;