package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import b2o4.dto.Signup;

@Mapper
public interface SignupMapper {
	
	int idCheck(String memberId);
	
    List<Signup> findAll();

    void insertSignup(Signup signup);
    
    void SelectSugnup(Signup signup);

    
    
}
