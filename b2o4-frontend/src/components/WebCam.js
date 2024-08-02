import React, { useRef, useEffect, useState } from 'react';
import '../css/Streaming.css';

const WebCam = () => {
    const videoRef = useRef(null);
    const [webCamView, setWebCamView] = useState(false);

    const getCamera = () => {

        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getCamera();
    }, [webCamView]);

    return (
        <div className='webcam-container'>
            <video className='webcam' ref={videoRef} style={{ display: webCamView ? 'block' : 'none' }} />
            <span className='blackScreen' style={{ display: webCamView ? 'none' : 'flex' }}>
                <p>준비 중 입니다.</p>
            </span>
            <div className="button-container">
                <button onClick={() => setWebCamView(!webCamView)}>
                    {webCamView ? '스트리밍 종료' : '스트리밍 시작'}
                </button>
            </div>  
        </div>
        

    )
};

export default WebCam;