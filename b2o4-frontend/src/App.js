import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./component/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";

import GoogleMap from './component/GoogleMap';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/members/signup" element={<Signup />}></Route>

        <Route path='/members/GoogleMap' element={<GoogleMap />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
