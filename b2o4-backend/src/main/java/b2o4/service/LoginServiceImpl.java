package b2o4.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Login;
import b2o4.mapper.LoginMapper;

@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	private LoginMapper loginMapper;

	@Override
	public Map<String, Object> login(Login login) {
		Login loginMember = loginMapper.login(login);

		Map<String, Object> map = new HashMap<>();
		map.put("loginMember", loginMember);

		return map;
	}
}
