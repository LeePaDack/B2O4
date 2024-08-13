package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.NaverUser;
import b2o4.mapper.NaverUserMapper;


@Service
public class NaverUserServiceImpl  implements NaverUserService{
	@Autowired 
	NaverUserMapper userMapper;
	
	@Override
	public void insertNaverUser(NaverUser user) {
	
		userMapper.insertNaverUser(user);
	}
}
