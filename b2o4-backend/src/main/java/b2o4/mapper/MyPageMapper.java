package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.MyPage;

@Mapper
public interface MyPageMapper {

	MyPage myPageMemberInfo(String memberId);
	
	
}
