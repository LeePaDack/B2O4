package b2o4.service;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import b2o4.dto.Member;

public interface LoginService {
	// 로그인하기
	Map<String, Object> login(Member member);
	
	// 아이디 찾기
	Map<String, Object> findId(Member member);
}
