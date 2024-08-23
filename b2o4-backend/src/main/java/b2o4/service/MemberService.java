<<<<<<< HEAD

package b2o4.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.Member;



public interface MemberService {
	List<Member> findAllMember();
	
	void insertMember(Member member, MultipartFile memberProfile);
	
	int idCheck(String memberId);
	
	int signup(Member member);
	
	
=======
package b2o4.service;

import b2o4.dto.Member;

public interface MemberService {
	// 네이버 SNS 연동해서 회원가입하는 insert
	public void NaverRegister(Member member);

>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
}
