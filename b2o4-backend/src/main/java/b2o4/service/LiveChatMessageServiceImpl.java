package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import b2o4.dto.LiveChatMessage;

@Service
public class LiveChatMessageServiceImpl implements LiveChatMessageService{
	
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    public void sendMessage(LiveChatMessage message) {
        messagingTemplate.convertAndSend("/topic/public", message);
    }

    public void addUser(LiveChatMessage message) {
        messagingTemplate.convertAndSend("/topic/public", message);
    }
	
}