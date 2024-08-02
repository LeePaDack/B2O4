package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.LoginMember;

@Mapper
public interface LoginMapper {
	LoginMember login(LoginMember loginMember);
}
