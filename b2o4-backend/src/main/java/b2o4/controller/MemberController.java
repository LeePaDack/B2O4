package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Member;
import b2o4.service.MemberService;

@RestController
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@PostMapping("/naverAPI/register")
    public String NaverRegister(@RequestBody Member member) {
        memberService.NaverRegister(member);

        return "회원가입 성공!!!!";
    }
}
