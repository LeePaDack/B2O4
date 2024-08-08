package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import b2o4.dto.Member;

@Mapper
public interface LoginMapper {
	Member login(Member member);
}