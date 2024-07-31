package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Signup;
import b2o4.mapper.SignupMapper;

@Service
public class SignupServiceImpl implements SignupService {

    private final SignupMapper signupMapper;

    @Autowired
    public SignupServiceImpl(SignupMapper signupMapper) {
        this.signupMapper = signupMapper;
    }

    @Override
    public List<Signup> findAll() {
        return signupMapper.findAll();
    }

    @Override
    public void insertSignup(Signup signup) {
        signupMapper.insertSignup(signup);
    }
}
