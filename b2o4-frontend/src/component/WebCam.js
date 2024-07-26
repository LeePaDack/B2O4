import React, { useRef, useEffect } from 'react';

const Webcam = () => {
    const videoRef = useRef(null);

    const getCamera = () => {
        
        navigator.mediaDevices.getUserMedia({
            video:true
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

    useEffect(() => {	//끼얏호우
        getCamera();
    }, [videoRef]);

    return(
        <div className='webcam-layout-container'>
            <video className='webcam-container' ref={videoRef}/>
        </div>
    )
};

export default Webcam;