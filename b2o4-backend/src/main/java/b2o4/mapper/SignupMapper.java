package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Signup;

@Mapper
public class SignupMapper {
	List<Signup> findAll();
	
	void insertSignup(Signup singup);
}
