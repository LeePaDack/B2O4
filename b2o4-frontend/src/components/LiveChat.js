import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs'; //   Client from 'stomp/stompjs'  ->   @stomp/stompjs
import SockJS from 'sockjs-client';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:9001/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: function (str) {
        console.log('STOMP Debug:', str);
      },
      onConnect: function (frame) {
        console.log('STOMP Connected:', frame);
        setConnected(true);
        client.subscribe('/topic/messages', (response) => {
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

  const sendMessage = () => {
    if (stompClient && connected && message) {
      stompClient.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ sender: 'User', content: message })
      });
      setMessage('');
    } else if (!connected) {
      console.error('연결이 안됩니다. 관리자에 문의하세요.');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!connected}
      />
      <button onClick={sendMessage} disabled={!connected}>
        Send
      </button>
      {!connected && <p>서버 연결중...</p>}
    </div>
  );
};

export default LiveChat;