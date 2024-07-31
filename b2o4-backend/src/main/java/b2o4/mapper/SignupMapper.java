package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import b2o4.dto.Signup;

@Mapper
public interface SignupMapper {
    
    @Select("SELECT * FROM user")
    List<Signup> findAll();

    @Insert("INSERT INTO User(memberId, memberPw, memberEmail, memberName, memberBirth, memberPhone, memberAddress, memberProfile) " +
            "VALUES (#{memberId}, #{memberPw}, #{memberEmail}, #{memberName}, #{memberBirth}, #{memberPhone}, #{memberAddress}, #{memberProfile})")
    void insertSignup(Signup signup);
}
