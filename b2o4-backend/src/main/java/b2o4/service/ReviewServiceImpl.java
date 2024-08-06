package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Review;
import b2o4.mapper.ReviewMapper;

@Service
public class ReviewServiceImpl implements ReviewService {
	@Autowired
	private ReviewMapper reviewMapper;
	
	// 구장 리스트 보기
	@Override
	public List<Review> stadiumGetList() {
		return reviewMapper.stadiumGetList();
	}
	
	// 참가자 리스트 보기
	@Override
	public List<Review> memberGetList() {
		return reviewMapper.memberGetList();
	}
	
	// 구장 평가 리스트 보기
	/*
	@Override
	public List<Review> stadiumReviewList() {
		return reviewMapper.stadiumReviewList();
	}
	*/
	// 구장 평가 업로드
	@Override
	public int stadiumReviewUpload(Review review) {
		return reviewMapper.stadiumReviewUpload(review);
				
	}
	
}
