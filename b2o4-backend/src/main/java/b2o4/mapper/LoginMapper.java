package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Login;

@Mapper
public interface LoginMapper {
	Login login(Login login);
}
