package b2o4.controller;

<<<<<<< HEAD
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
import b2o4.dto.Member;
import b2o4.service.MemberService;

@RestController
<<<<<<< HEAD
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping
    public List<Member> findAllMember() {
        return memberService.findAllMember();
    }

    @PostMapping("/members")
    public void insertMember(@ModelAttribute Member member,
                             @RequestParam("profileImage") MultipartFile memberProfile) {
        
        System.out.println("member: " + member);
        System.out.println("member: " + member);
        System.out.println("memberProfile: " + memberProfile);
        // 프로필 이미지 파일 및 기타 처리 로직
        memberService.insertMember(member, memberProfile);
    }



    @GetMapping("/idCheck")
    public Map<String, Boolean> idCheck(@RequestParam("id") String id) {
        boolean isAvailable = memberService.idCheck(id) == 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAvailable", isAvailable);
        return response;
    }

=======
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@PostMapping("/naverAPI/register")
    public String NaverRegister(@RequestBody Member member) {
        memberService.NaverRegister(member);

        return "회원가입 성공!!!!";
    }
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
}
