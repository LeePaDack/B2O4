package b2o4.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import b2o4.dto.Signup;

@Mapper
public interface SignupMapper {
    List<Signup> findAll();
    void insertSignup(Signup signup);
    int idCheck(@Param("memberId") String memberId);
}
