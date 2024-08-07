package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    
    //채팅 주고받게 하기
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
    	ChatLog log = new ChatLog();
    	log.setMemberNo(1);
    	log.setMsgContent(message.getContent());
    	
    	System.out.println("리액트에서 들어온 메시지 : " + message.getContent());
    	System.out.println("임시 멤버 번호 : " + log.getMemberNo());
    	System.out.println("로그로 들어온 메시지 : " + log.getMsgContent());
    	
    	chatService.recordChatMessage(log);
        return message;
    }
    
    //채팅 DB에 넣기
    @PostMapping("/chat")
    public void recordChatMessage(@RequestBody ChatLog log) {
    	chatService.recordChatMessage(log);
    }
    
    //채팅 내역 불러오기
    
    //삭제할 채팅
    @DeleteMapping("/chat")
    public void deleteChatMessage(@RequestParam("msgNo") int msgNo) {
    	chatService.deleteChatMessage(msgNo);
    }
    
    // 채팅 동결
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
}