package b2o4.service;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.ChatLog;
import b2o4.mapper.ChatMapper;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatMapper mapper;
	
	@Override
	public void recordChatMessage(ChatLog log) {
		System.out.println(log.toString());
		mapper.recordChatMessage(log);
	}
	
    @Override
    public void deleteChatMessage(@Param("msgContent") String msgContent, @Param("msgAt") String msgAt) {
    	
        System.out.println("삭제할 채팅시간: " + msgAt + " // 채팅내용 :" +msgContent);
        mapper.deleteChatMessage(msgContent, msgAt);
    }

}
