import React from 'react'
import WebCam from './WebCam';
import LiveChat from './LiveChat';
import '../css/Streaming.css';

function LiveStreamingService() {

  return (
    <div className='streaming-container'>

      <WebCam/>
      <LiveChat/>

    </div>
  )

}

export default LiveStreamingService;