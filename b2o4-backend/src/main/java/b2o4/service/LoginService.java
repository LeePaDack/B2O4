package b2o4.service;

import java.util.Map;

import b2o4.dto.Member;

public interface LoginService {
	Map<String, Object> login(Member member);
}
