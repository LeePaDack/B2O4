import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LiveStreamingPage from "./components/LiveStreamingPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login";
import MyPageContext from "./components/MyPageContext";

function App () {
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
            <Header/>
            <Routes>
                <Route path="/LiveStreamingPage" element={<LiveStreamingPage/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer/>
        </Router>
        </MyPageContext.Provider>
    )
}
export default App;