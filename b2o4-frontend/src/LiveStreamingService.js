import React from 'react'
import WebCam from './components/WebCam';
import LiveChat from './components/LiveChat';
import './css/Streaming.css';


function LiveStreamingService() {

  return (
    <div className='streaming-container'>
        <WebCam/>
        <LiveChat/>
    </div>
  )

}

export default LiveStreamingService;