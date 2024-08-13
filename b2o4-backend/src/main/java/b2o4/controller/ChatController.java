package b2o4.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    ChatLog forDeleteMessage = new ChatLog();
    ChatLog chatLog = new ChatLog();
    
    //채팅 주고받게 하기
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
    	chatLog.setMemberId(message.getSender()); // 유저 id
    	chatLog.setMsgContent(message.getContent()); // 유저 채팅
    	
    	//신식 날짜 포맷터
    	DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    	String msgAt = LocalDateTime.now().format(timeFormat);
    	chatLog.setMsgAt(msgAt);

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
    @DeleteMapping("/chat/delete")
    public ResponseEntity<String> deleteChatMessage(
        @RequestParam("msgContent") String msgContent,
        @RequestParam("msgAt") String msgAt
    ) {
        chatService.deleteChatMessage(msgContent, msgAt);   
        return ResponseEntity.ok("삭제 되냐?");
    }
    
    //채팅창 동결/재개 전환
    @MessageMapping("/chat.freezeChat")
    @SendTo("/topic/freezeChat")
    public boolean chatFreezing() {
        freezeChat = !freezeChat;
        return freezeChat;
    }

    //채팅창 동결/재개 상태 전파
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
    
    //스트리밍 시작/종료 상태 전파
    @GetMapping("/chat/streaming")
    public boolean getStreamingBegin() {
    	return streamingBegin;
    }
    
    //메시지 삭제 전환
    @MessageMapping("/chat.deleteMessage")
    @SendTo("/topic/deleteMessage")
    public ChatLog removeMessageSpread(@RequestBody ChatLog chatLog) {
    	forDeleteMessage = chatLog;
    	return chatLog;
    }
    
    //삭제할 메시지 정보를 반환
    @GetMapping("/chat/deleteMessage")
    public ChatLog getRemoveMessageSpread() {
        return forDeleteMessage;
    }
}