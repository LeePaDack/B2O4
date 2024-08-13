package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.NaverUser;

@Mapper
public interface NaverUserMapper {
	List<NaverUser> fildAll();
	
	void insertNaverUser(NaverUser user);

}
