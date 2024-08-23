package b2o4.mapper;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Member;

@Mapper
public interface MemberMapper {
<<<<<<< HEAD
	List<Member> findAllMember();
	
	void insertMember(Member member);
	
	int idCheck(String memberId);
	
	int signup(Member member);
	
=======
	void NaverRegister(Member member);
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
}