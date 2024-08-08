package b2o4.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Member;
import b2o4.service.LoginService;

@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	// 로그인하기
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member member) {
		return loginService.login(member);
	}
	
	// 아이디 찾기
	@PostMapping("/findId")
	public Map<String, Object> findId(@RequestBody Member member) {
		return loginService.login(member);
	}
}
