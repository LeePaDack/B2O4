package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Review;
import b2o4.service.ReviewService;

@RestController
@RequestMapping("/stadium")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	@GetMapping
	public List<Review> stadiumGetList() {
		return reviewService.stadiumGetList();
	}
}
