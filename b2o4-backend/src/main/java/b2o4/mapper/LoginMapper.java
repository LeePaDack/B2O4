package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import b2o4.dto.Member;

@Mapper
public interface LoginMapper {
	
	// 로그인하기
	Member login(Member member);
	
	// 아이디 찾기
    Member findId(Member member);
}
