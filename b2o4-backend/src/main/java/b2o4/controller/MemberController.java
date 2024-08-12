package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Member;
import b2o4.service.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping
	public List<Member> findAllMember() {
		return memberService.findAllMember();
	}
	
	@PostMapping
	public void insertMember(@RequestBody Member member) {
		memberService.insertMember(member);
	}
	
	@GetMapping("idCheck")
	public int idCheck(@RequestParam String id) {
		return memberService.idCheck(id);
	}
	
	@PostMapping("/signup")
	public int signup(@RequestBody Member member) {
		return memberService.signup(member);
	}
}
