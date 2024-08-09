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
        </Routes>
        <Footer />
      </Router>
    </MyPageContext.Provider>
  );
}

export default App;