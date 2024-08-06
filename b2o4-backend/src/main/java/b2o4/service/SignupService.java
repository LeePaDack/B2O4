package b2o4.service;

import java.util.List;

import b2o4.dto.Signup;

public interface SignupService {
	int idCheck(String memberId);
    List<Signup> findAll();
    void insertSignup(Signup signup);
    void insertImage();

    
    
}
