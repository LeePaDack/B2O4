import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./component/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";

import RealTimeLocationMap from './component/RealTimeLocationMap';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/members/signup" element={<Signup />}></Route>

        <Route path='/members/RealTimeLocationMap' element={<RealTimeLocationMap />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
