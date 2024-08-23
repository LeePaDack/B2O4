package b2o4.service;

import java.util.Map;

import b2o4.dto.Member;

public interface LoginService {
<<<<<<< HEAD
	// 로그인하기
	Map<String, Object> login(Member member);
	
	// 아이디 찾기
	Member findId(Member member);
	
	// 비밀번호 찾기
	Member findPw(Member member);
	
	// 비밀번호 변경
	void updatePassword(Member member);
}
=======
	Map<String, Object> login(Member member);
}
>>>>>>> leegyejun-board
