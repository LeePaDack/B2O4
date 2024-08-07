package b2o4.service;

import java.util.List;
import b2o4.dto.Signup;

public interface SignupService {
    List<Signup> findAll();
    void insertSignup(Signup signup);
    int idCheck(String memberId);
}