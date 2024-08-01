package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Mypage;

@Mapper
public interface MypageMapper {

	void userFind(Mypage mypage);
}
