package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;

import b2o4.dto.ChatLog;

@Mapper
public interface ChatMapper {
	
	//채팅 기록 저장
	void recordChatMessage(@RequestBody ChatLog log);
	
	//채팅 기록 삭제
    void deleteChatMessage(@Param("msgContent") String msgContent, @Param("msgAt") String msgAt);
	
	//채팅 불러오기
	/*List<ChatLog> getAllMessages();*/
}
