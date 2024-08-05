package b2o4.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Member;
import b2o4.service.LoginService;

@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member member) {
		return loginService.login(member);
	}
}
