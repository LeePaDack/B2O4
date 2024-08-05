import React from "react";
import LiveStreamingService from "./components/LiveStreamingService";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import './App.css';

const LiveStreamingPage = () => {

    return (
        <div className="livePage-container">
            <Header/>
            <LiveStreamingService/>
            <Footer/>
        </div>
    )
}
export default LiveStreamingPage;