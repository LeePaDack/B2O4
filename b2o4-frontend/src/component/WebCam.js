import React, { useRef, useEffect, useState } from 'react';
import '../css/WebCam.css';

const Webcam = () => {
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
        <div>
            <div className='webcam-layout-container'>
                {webCamView ? <span className="blackScreen"></span> : <video className='webcam-container' ref={videoRef} />}
                <div className="button-container">
                    <button onClick={() => setWebCamView(!webCamView)}>
                        {webCamView ? '스트리밍 시작' : '스트리밍 종료'}
                    </button>
                </div>      
            </div>
        </div>


    )
};

export default Webcam;