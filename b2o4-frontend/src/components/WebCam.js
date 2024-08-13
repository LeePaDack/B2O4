import React, { useRef, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import '../css/Streaming.css';
import axios from 'axios';

const WebCam = () => {
    const videoRef = useRef(null);
    const [webCamView, setWebCamView] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);

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

    // 스트리밍 시작 버튼 활성화/비활성화 다른 사용자들에게 공유 시키기
    useEffect(() => {
        const socket = new SockJS('http://localhost:9001/ws'); // java 쪽의 서버포트 설정과 맞춰서 작성
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: function (str) {
                console.log('STOMP Debug:', str);
            },
            onConnect: function (frame) {
                console.log('STOMP Connected:', frame);
                setConnected(true);
                client.subscribe('/topic/streaming', (response) => {
                    console.log(webCamView);
                    setWebCamView(JSON.parse(response.body));
                });

                //현재 스트리밍 상태 여부를 서버에서 가져오기
                axios.get('http://localhost:9001/chat/streaming')
                .then(res => {
                    const stream = res.data;
                    setWebCamView(stream);
                    if(stream){
                        getCamera();
                    }
                })
            },
            onStompError: function (frame) {
                console.error('STOMP Error:', frame);
            },
            onWebSocketError: function (error) {
                console.error('웹소켓 에러:', error);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [webCamView]);

    //스트리밍이 활성화되면 카메라 시작
    useEffect(() => {
        if(webCamView){
            getCamera();
        }     
    }, [webCamView]);

    //스트리밍 시작 버튼 모든 사용자들에게 뿌리기
    const handleBeginStreaming = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/chat.streaming'
            });
        }
    }

    return (
        <div className='webcam-container'>
            {webCamView ?
                <video className='webcam' ref={videoRef} controls />
                :
                <span className='blackScreen' style={{ display: 'flex' }}>
                    <p>준비 중 입니다.</p>
                </span>
            }
            <div className="button-container">
                <button onClick={handleBeginStreaming} className='btn btn-outline-success'>
                    {webCamView ? 'Quit Streaming' : 'Begin Streaming'}
                </button>
            </div>
            {!connected && <p>서버 연결중...</p>}
        </div>
    )
};

export default WebCam;