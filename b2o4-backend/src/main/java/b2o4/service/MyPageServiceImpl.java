package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.MyPage;
import b2o4.mapper.MyPageMapper;

@Service
public class MyPageServiceImpl implements MyPageService {

	@Autowired
	private MyPageMapper myPageMapper;
	
	@Override
	public MyPage myPageMemberInfo(String memberId) {
		return myPageMapper.myPageMemberInfo(memberId);
	}
	
	
}
