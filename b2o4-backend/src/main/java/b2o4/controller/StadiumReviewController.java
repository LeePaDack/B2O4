package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Review;
import b2o4.service.ReviewService;

@RestController
@RequestMapping("/api")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	// 풋살장 리스트 보기
	@GetMapping("/stadiumReview")
	public List<Review> stadiumGetList() {
		return reviewService.stadiumGetList();
	}
	
	// 참가자 리스트 보기
	@GetMapping("/memberReview")
	public List<Review> memberGetList() {
		return reviewService.memberGetList();
	}
	
	// 풋살장 평가 보기 리스트
	/*
	@GetMapping("/stadiumreview")
	public List<Review> stadiumReviewList() {
		return reviewService.memberGetList();
	}
	*/
	
	// 풋살장 평가하기
	@PostMapping("/stadiuminputreview")
	public int stadiumReviewUpload(@RequestBody Review review) {
		return reviewService.stadiumReviewUpload(review);
	}
	
}
