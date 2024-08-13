import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./component/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";
import UserInfo from './component/Userlnfo';
import Login from './component/Login';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/members/signup" element={<Signup />}></Route>
        <Route path='/members/Login' element={<Login />} />
        <Route path='/members/userinfo' element={<UserInfo />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
