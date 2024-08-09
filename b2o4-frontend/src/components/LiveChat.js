import React, { useState, useEffect, useRef, useContext } from 'react';
import { Client } from '@stomp/stompjs'; //   Client from 'stomp/stompjs'  ->   @stomp/stompjs
import SockJS from 'sockjs-client';
import '../css/Streaming.css';
import Emoji from './Emoji';
import axios from 'axios';
import MyPageContext from './MyPageContext';

const LiveChat = () => {
  const { loginMember } = useContext(MyPageContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [emojiPick, setEmojiPick] = useState(false);
  const [freezeChat, setFreezeChat] = useState(false);
  const messagesContainerRef = useRef(null);
  //const [allMessages, setAllMessages] = useState([]);

  // 서버에 요청 보내서 일반 사용자들에게 뿌리는 기능
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
        client.subscribe('/topic/freezeChat', (response) => {
          console.log(freezeChat);
          setFreezeChat(JSON.parse(response.body));
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
  }, [freezeChat]);

  // 최신 채팅이 일어난 곳으로 채팅창 스크롤만 움직이게 하기
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const timeFormat = (date) => {
    const timeFormat = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date).toLowerCase();

    return timeFormat;
  }

  // 메시지 보내기
  const sendMessage = () => {
    if (stompClient && connected && message) {
      const memberProfile = loginMember.memberProfile;
      const msgAt = timeFormat(new Date());
      stompClient.publish({
        destination: '/app/chat.send', //java 쪽의 컨트롤러(@MessageMapping)와 맞춰서 작성
        body: JSON.stringify({
          profile: memberProfile,
          sender: loginMember.memberId,
          content: message,
          time: msgAt,
        })
      });
      setMessage('');
    }
    else if (!connected) {
      console.error('연결이 안됩니다. 관리자에 문의하세요.');
    }
  };

  //채팅 입력창 엔터키 반응
  const enterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  //이모지창 열고 닫기
  const emojiPicker = () => {
    setEmojiPick(!emojiPick);
  }

  //이모지를 메시지에 넣어서 보내기
  const emojiMessage = (emoji) => {
    setMessage((prevMessages) => prevMessages + emoji);

  }

  //채팅 메시지 삭제
  const deleteMessage = async ({ msgContent, msgAt }) => {
    console.log("삭제할 메시지 내용:", msgContent);
    console.log("삭제할 메시지 시간:", msgAt);

    await axios.delete('/chat', {
      params: { msgContent, msgAt }
    });


  };

  //채팅창 전체 동결
  const handleFreezeChat = () => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/chat.freezeChat'
      });
      stompClient.subscribe('/topic/freezeChat', (response) => {
        const newFreezeChatState = JSON.parse(response.body);
        setFreezeChat(newFreezeChatState);
      });
    }
  }
  /*
  //메시지 다 불러오기
  const getAllMessages = async () => {
    await axios.get("/chat/all")
    .then(res => {
      setAllMessages(res.data);
    })
  }

  useEffect(() => {
    getAllMessages();
  },[messages])
  
  console.log(allMessages);
  */
  console.log(messages);
  return (
    <div className='chat-container'>
      <div className='messages' ref={messagesContainerRef}>
        {messages.map((msg, msgNo) => (
          <div key={msgNo} className='message'>
            <img src={msg.profile} alt="profileImage" className='profile-image' />
            <div className='message-content'>
              <strong>{msg.sender}</strong>
              <p>{msg.content} <span className='time-text'>{msg.time}</span></p>
            </div>
            <button className='deleteBtn'
              onClick={() => deleteMessage({ msgContent: msg.content, msgAt: msg.time })}>X</button>
          </div>
        ))}
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
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
          </svg>
        </div>
      </div>
      <button onClick={handleFreezeChat} className='btn btn-outline-success'>
        {freezeChat ? 'Release Chat' : 'Freeze Chat'}
      </button>
      {!connected && <p>서버 연결중...</p>}
    </div>
  );
};

export default LiveChat;