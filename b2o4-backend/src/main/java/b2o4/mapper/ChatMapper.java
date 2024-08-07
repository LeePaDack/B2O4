package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestBody;

import b2o4.dto.ChatLog;

@Mapper
public interface ChatMapper {
	
	//채팅 기록 저장
	void recordChatMessage(@RequestBody ChatLog log);
	
	//채팅 기록 삭제
	void deleteChatMessage(int msgNo);
}
