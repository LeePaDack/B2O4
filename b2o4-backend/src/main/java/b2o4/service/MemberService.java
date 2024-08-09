
package b2o4.service;

import java.util.List;
import java.util.Map;

import b2o4.dto.Member;



public interface MemberService {
	List<Member> findAllMember();
	
	void insertMember(Member member);
	
	int idCheck(String memberId);
	
	int signup(Member member);

}
