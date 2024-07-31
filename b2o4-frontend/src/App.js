import './App.css';
import GalleryUpload from './components/GalleryUpload.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Layout/Navbar.js';
import GalleryBoard from './components/GalleryBoard.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' />
          <Route path='/galleryUpload' element={<GalleryUpload />} />
        </Routes>
      </BrowserRouter>
      <GalleryBoard />
    </div>
  );
}

export default App;
