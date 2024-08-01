package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Mypage;
import b2o4.service.MypageService;

@RestController
@RequestMapping("/members")
public class MypageController {

	@Autowired
	private MypageService mypageService;
	
	@GetMapping
	public void userFind(@RequestBody Mypage mypage) {
		mypageService.userFind(mypage);
	}
}
