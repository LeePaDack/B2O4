import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs'; //   Client from 'stomp/stompjs'  ->   @stomp/stompjs
import SockJS from 'sockjs-client';
import '../css/Streaming.css';
import Emoji from './Emoji';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [emojiPick, setEmojiPick] = useState(false);
  const [freezeChat, setFreezeChat] = useState(false);
  const messagesEndRef = useRef(null);

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
        client.subscribe('/topic/messages', (response) => { // java 쪽의 컨트롤러(@SendTo)와 맞춰서 작성
          const newMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
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
  }, []);

  useEffect(() => {
    // 메시지가 업데이트될 때마다 자동으로 스크롤을 아래로 이동
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && connected && message) {
      stompClient.publish({
        destination: '/app/chat.send', //java 쪽의 컨트롤러(@MessageMapping)와 맞춰서 작성
        body: JSON.stringify({ sender: 'User', content: message })
      });
      setMessage('');
    } else if (!connected) {
      console.error('연결이 안됩니다. 관리자에 문의하세요.');
    }
  };

  const enterKey = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      sendMessage();
    }
  }
  
  const emojiPicker = () => {
    setEmojiPick(!emojiPick);
  }

  const emojiMessage = (emoji) => {
    setMessage((prevMessages) => prevMessages + emoji);
    
  }

  const deleteMessage = (index) => {
    setMessages(messages.filter((message, i) => i !== index));
    
  }

  const handleFreezeChat = () => {
    setFreezeChat(!freezeChat);
  }

  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div key={index} className='message'>
            <strong>{msg.sender}</strong>: {msg.content} 
            <button className='deleteBtn' onClick={() => deleteMessage(index)}>X</button>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='chat-box'>
        <div className='input-container'>
          {emojiPick && <Emoji onSelect={emojiMessage} />}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!connected || freezeChat}
            onKeyDown={enterKey}
            className='message-input'
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-emoji-smile emoji-icon"
            viewBox="0 0 16 16"
            onClick={emojiPicker} // SVG 클릭 시 이모지 선택기 표시/숨기기
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
          </svg>
        </div>
      </div>   
      <button onClick={handleFreezeChat}>{freezeChat ? '채팅창 동결 해제' : '채팅창 동결'}</button>
      {!connected && <p>서버 연결중...</p>}
    </div>
  );
};

export default LiveChat;