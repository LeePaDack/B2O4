package b2o4.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Mypage;
import b2o4.mapper.MypageMapper;

@Service
public class MypageServiceImpl implements MypageService {

	@Autowired
	private MypageMapper mypageMapper;
	
	@Override
	public void userFind(int memberNo) {
		mypageMapper.userFind(memberNo);
	}
	
	@Override
	public Map<String, Object> login(Mypage mypage) {
		Mypage loginMember = mypageMapper.login(mypage);
		
		Map<String, Object> map = new HashMap<>();
		map.put("loginMember", loginMember);
		
		return map;
	}
}
