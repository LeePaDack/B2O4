package b2o4.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	public void userFind(@RequestBody int memberNo) {
		mypageService.userFind(memberNo);
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Mypage mypage) {
		return mypageService.login(mypage);
	}
}
