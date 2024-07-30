package b2o4.service;

import b2o4.dto.LiveChatMessage;

public interface LiveChatMessageService {

	void sendMessage(LiveChatMessage message);
	void addUser(LiveChatMessage message);
}