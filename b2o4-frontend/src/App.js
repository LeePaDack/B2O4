import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./component/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/members/signup" element={<Signup />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
