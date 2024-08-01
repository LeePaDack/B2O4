package b2o4.service;

import java.util.Map;

import b2o4.dto.Mypage;

public interface MypageService {

	void userFind(int memberNo);
	
	Map<String, Object> login(Mypage mypage);
}
