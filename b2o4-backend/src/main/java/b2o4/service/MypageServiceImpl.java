package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Mypage;
import b2o4.mapper.MypageMapper;

@Service
public class MypageServiceImpl implements MypageService {

	@Autowired
	private MypageMapper mypageMapper;
	
	@Override
	public void userFind(Mypage mypage) {
		mypageMapper.userFind(mypage);
	}
}
