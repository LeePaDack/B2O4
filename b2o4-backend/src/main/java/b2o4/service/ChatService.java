package b2o4.service;


import org.apache.ibatis.annotations.Param;

import b2o4.dto.ChatLog;

public interface ChatService {

	// 채팅 기록 저장
	void recordChatMessage(ChatLog log);
	
	// 채팅 기록 삭제
	void deleteChatMessage(@Param("msgContent") String msgContent, @Param("msgAt") String msgAt);
	
	//모든 채팅 가져오기
	/*List<ChatLog> getAllMessages();*/
}
