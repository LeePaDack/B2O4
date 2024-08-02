import logo from "./logo.svg";
import "./App.css";
import MyPage from "./MyPage/MyPage";
import MyPageContext from "./MyPage/MyPageContext";
import { useState } from "react";
import Login from "./MyPage/testLogin";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StadiumsInfo from "./Review/StadiumMain";

function App() {
  const [loginMember, setLoginMember] = useState(null);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StadiumsInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
