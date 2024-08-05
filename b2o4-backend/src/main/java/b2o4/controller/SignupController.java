package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Signup;
import b2o4.service.SignupService;

@RestController
@RequestMapping
public class SignupController {
	@Autowired
	private SignupService signupService;
	
	@GetMapping
	public List<Signup> findAll(){
		return signupService.findAll();
	}
	
	@PostMapping("/register")
	public void insertSignup(@RequestBody Signup signup) {
		signupService.insertSignup(signup);
	}
}
