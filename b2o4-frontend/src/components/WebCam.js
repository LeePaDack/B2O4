import React, { useRef, useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import '../css/Streaming.css';

const WebCam = () => {
    const videoRef = useRef(null);
    const [webCamView, setWebCamView] = useState(false);
    const handleFullScreen = useFullScreenHandle();

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
            {webCamView ?             
            <FullScreen handle={handleFullScreen} >
                <video className='webcam' ref={videoRef}/>
            </FullScreen> :
            <span className='blackScreen' style={{ display: 'flex' }}>
                <p>준비 중 입니다.</p>
            </span>
            }
            <div className="button-container">
                <button onClick={() => setWebCamView(!webCamView)}>
                    {webCamView ? '스트리밍 종료' : '스트리밍 시작'}
                </button>
                <button onClick={handleFullScreen.enter}>전체화면</button>
            </div>
        </div>
    )
};

export default WebCam;