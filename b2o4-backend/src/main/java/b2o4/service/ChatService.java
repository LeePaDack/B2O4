package b2o4.service;

import b2o4.dto.ChatLog;

public interface ChatService {

	// 채팅 기록 저장
	void recordChatMessage(ChatLog log);
	
	// 채팅 기록 삭제
	void deleteChatMessage(int msgNo);
}
