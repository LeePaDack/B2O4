import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import LiveStreamingPage from "./components/LiveStreamingPage";

function App () {
    return (
        <Router>
            <Routes>
                <Route path="/LiveStreamingPage" element={<LiveStreamingPage/>}/>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </Router>
    )
}
export default App;