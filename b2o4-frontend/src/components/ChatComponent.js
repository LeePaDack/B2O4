import React, { useState, useEffect } from 'react';
import { connect, sendMessage, subscribeToChat } from './StompService'; // StompService는 WebSocket 관련 함수들을 담은 파일입니다.

function ChatComponent() {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        connect(); // 컴포넌트가 마운트될 때 WebSocket 연결을 설정합니다.
        subscribeToChat(message => {
            // 서버로부터 새로운 메시지가 도착하면 처리합니다.
            setChatMessages(prevMessages => [...prevMessages, message]);
        });
    }, []);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            sendMessage(message); // 입력한 메시지를 서버로 전송합니다.
            setMessage(''); // 입력 필드를 비웁니다.
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                {chatMessages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ marginRight: '10px' }} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatComponent;