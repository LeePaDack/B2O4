package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Review;

@Mapper
public interface ReviewMapper {

	// 구장 리스트 보기
	List<Review> stadiumGetList();
	
	// 참가자 리스트 보기
	List<Review> memberGetList();
}
