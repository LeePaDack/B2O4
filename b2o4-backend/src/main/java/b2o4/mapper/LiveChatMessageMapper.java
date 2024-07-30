package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.LiveChatMessage;


@Mapper
public interface LiveChatMessageMapper {

	void sendMessage(LiveChatMessage message);
	void addUser(LiveChatMessage message);
}