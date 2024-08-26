import React from "react";
import WebCam from "./WebCam";
import LiveChat from "./LiveChat";
import '../css/Streaming.css';

const LiveStreamingPage = () => {

    return (
        <div className="livePage-container">
            <WebCam />
            <LiveChat />
        </div>
    )
}
export default LiveStreamingPage;