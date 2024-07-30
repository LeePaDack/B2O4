import { Client } from '@stomp/stompjs';

let stompClient = null;

export function connect() {
    const socket = new WebSocket('ws://localhost:8999/chat'); // WebSocket 서버 주소
    stompClient = new Client({
        brokerURL: 'ws://localhost:8999/chat',
        connectHeaders: {},
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
    });
    
    stompClient.onConnect = function(frame) {
        console.log('Connected: ' + frame);
    };

    stompClient.activate();
}

export function sendMessage(message) {
    if (stompClient) {
        stompClient.publish({
            destination: '/app/liveChat',
            body: JSON.stringify({ msgContent: message }),
        });
    }
}

export function subscribeToChat(callback) {
    if (stompClient) {
        stompClient.subscribe('/topic/public', message => {
            callback(JSON.parse(message.body));
        });
    }
}