package b2o4.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.ChatLog;
import b2o4.service.ChatService;
import b2o4.vo.ChatMessage;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;
    
    private boolean freezeChat = false;
    private boolean streamingBegin = false;
    
    //채팅 주고받게 하기
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
    	ChatLog chatLog = new ChatLog();
    	chatLog.setMemberId(message.getSender()); // 유저 id
    	chatLog.setMsgContent(message.getContent()); // 유저 채팅
    	chatLog.setMsgAt(LocalDateTime.now()); //채팅 등록 시간
    	
    	System.out.println("리액트에서 들어온 메시지 : " + message.getContent());
    	System.out.println("채팅입력한 멤버 아이디 : " + chatLog.getMemberId());
    	System.out.println("로그로 들어온 메시지 : " + chatLog.getMsgContent());
    	
    	chatService.recordChatMessage(chatLog);
        return message;
    }
    
    //채팅 DB에 넣기
    @PostMapping("/chat")
    public void recordChatMessage(@RequestBody ChatLog log) {
    	chatService.recordChatMessage(log);
    }
    
    //삭제할 채팅
    @DeleteMapping("/chat")
    public ResponseEntity<String> deleteChatMessage(@RequestParam("msgNo") int msgNo) {
		System.out.println("삭제할 msgNo: " + msgNo);
		chatService.deleteChatMessage(msgNo);
		return ResponseEntity.ok("삭제 되냐?");
    }
    
    // 채팅 동결 전환
    @MessageMapping("/chat.freezeChat")
    @SendTo("/topic/freezeChat")
    public boolean chatFreezing() {
        freezeChat = !freezeChat;
        return freezeChat;
    }

    // 채팅창 동결 상태 가져오기
    @GetMapping("/chat/freezeChat")
    public boolean getChatFreezing() {
        return freezeChat;
    }
    
    //스트리밍 시작/종료 전환
    @MessageMapping("/chat.streaming")
    @SendTo("/topic/streaming")
    public boolean streamingBegin() {
    	streamingBegin = !streamingBegin;
        return streamingBegin;
    }
    
    //스트리밍 시작/종료 상태 가져오기
    @GetMapping("/chat/streaming")
    public boolean getBeginStreaming() {
    	return streamingBegin;
    }
}