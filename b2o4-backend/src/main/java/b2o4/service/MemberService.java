package b2o4.service;

import b2o4.dto.Member;

public interface MemberService {
	// 네이버 SNS 연동해서 회원가입하는 insert
	public void NaverRegister(Member member);

}
