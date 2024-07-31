package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class SignupServicelmp implements SignupService {
	@Autowired
	SignupMapper SignupMapper;
	
	@Override
	public List<Signup> findAll(){
		return SignupMapper.findAll();
	}
	@Override
	public void insertSignup(Signup signup) {
		signupMapper,insertSugnup(signup);
	}
	
}
