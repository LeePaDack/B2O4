package b2o4.service;

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
	public void deleteChatMessage(int msgNo) {
		System.out.println("삭제할 채팅 번호" + msgNo);
		mapper.deleteChatMessage(msgNo);
	}
}
