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
}
