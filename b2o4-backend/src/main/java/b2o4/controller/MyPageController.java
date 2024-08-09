package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.MyPage;
import b2o4.service.MyPageService;

@RestController
@RequestMapping("/api")
public class MyPageController {

	@Autowired
	private MyPageService myPageService;
	
	@GetMapping("/mypage/{memberId}")
	public MyPage myPageMemberInfo(@PathVariable("memberId") String memberId) {
		return myPageService.myPageMemberInfo(memberId);
	}
}
