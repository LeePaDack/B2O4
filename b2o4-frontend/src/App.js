import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KakaoMap from "./components/KakaoMap";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/members/signup" element={<Signup />} />
        <Route path='/members/kakaoMap' element={<KakaoMap />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
