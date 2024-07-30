package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import b2o4.dto.LiveChatMessage;
import b2o4.service.LiveChatMessageService;


@Controller
public class LiveChatMessageController {

	@Autowired
	private LiveChatMessageService liveService;
	
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public LiveChatMessage sendMessage(@Payload LiveChatMessage chatMessage) {
    	liveService.sendMessage(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public LiveChatMessage addUser(@Payload LiveChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        liveService.addUser(chatMessage);
        return chatMessage;
    }
	
	
}