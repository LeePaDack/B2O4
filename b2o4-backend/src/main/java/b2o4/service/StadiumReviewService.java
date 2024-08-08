package b2o4.service;

import java.util.List;

import b2o4.dto.Review;

public interface ReviewService {

	// 구장 리스트 보기
	List<Review> stadiumGetList();
	
	// 참가자 리스트 보기
	List<Review> memberGetList();
	
	// 구장 평가 리스트 보기
	/*
	List<Review> stadiumReviewList();
	*/
	// 구장 평가 업로드
	int stadiumReviewUpload(Review review);

		
}
