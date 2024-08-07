import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import WebCam from "./WebCam";
import LiveChat from "./LiveChat";
import '../css/Streaming.css';

const LiveStreamingPage = () => {

    return (
        <div className="livePage-container">
            <Header/>
            <div className='streaming-container'>
                <WebCam />
                <LiveChat />
            </div>
            <Footer />
        </div>
    )
}
export default LiveStreamingPage;