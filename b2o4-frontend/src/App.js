import './App.css';
import GalleryUpload from './components/GalleryUpload.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Layout/Navbar.js';
import GalleryBoard from './components/GalleryBoard.js';
import Login from './components/Login.js';
import MyPageContext from './components/MyPageContext.js';
import { useState } from 'react';
import GalleryDetail from './components/GalleryDetail.js';


function App() {

  const [loginMember, setLoginMember] = useState(null);

  return (
    <div className="App">
    <MyPageContext.Provider value={{loginMember, setLoginMember}}> 
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' />
          <Route path='/login' element={<Login />} />
          <Route path='/galleryUpload' element={<GalleryUpload />} />
          <Route path='/galleryBoard' element={<GalleryBoard />} />
          <Route path='/galleryBoard/:gbpostNo' element={<GalleryDetail />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MyPageContext.Provider>
    </div>
  );
}

export default App;