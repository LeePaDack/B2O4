package b2o4.service;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import b2o4.dto.ChatLog;
import b2o4.dto.Member;

public interface ChatService {

	// 채팅 기록 저장
	void recordChatMessage(ChatLog log);
	
	// 채팅 기록 삭제
	void deleteChatMessage(@Param("msgContent") String msgContent, @Param("msgAt") String msgAt);
	
	//특정 사용자 채팅 기록 보기
	List<ChatLog> showWhosChat(@Param("memberId") String memberId);
	
	//채팅 금지 / 허용 전환
	String switchAuthToChat(@Param("memberId") String memberId, @Param("chatable") char chatable);
	
    //관리자인지 여부 확인
    boolean isAdmin(@Param("memberId") String memberId);

}