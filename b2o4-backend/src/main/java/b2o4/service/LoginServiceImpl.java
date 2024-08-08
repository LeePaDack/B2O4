package b2o4.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Member;
import b2o4.mapper.LoginMapper;

@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	private LoginMapper loginMapper;
	
	// 로그인하기
	@Override
	public Map<String, Object> login(Member member) {
		Member loginMember = loginMapper.login(member);
		
		Map<String, Object> map = new HashMap<>();
		map.put("loginMember", loginMember);
		
		return map;
	}
	
	// 아이디 찾기
	@Override
	public Map<String, Object> findId(Member member) {
		Member findId = loginMapper.login(member);
		
		Map<String, Object> map = new HashMap<>();
		map.put("findId", findId);
		return map;
	}
}
