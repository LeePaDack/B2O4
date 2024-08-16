package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import b2o4.dto.Member;
import b2o4.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping
    public List<Member> findAllMember() {
        return memberService.findAllMember();
    }

    @PostMapping("/members")
    public void insertMember(Member member,
                             @RequestParam("memberProfile") MultipartFile memberProfile) {
        if (!memberProfile.isEmpty()) {
            // 파일을 저장하고 파일 경로를 member 객체에 설정
            String fileName = memberProfile.getOriginalFilename();
            // 예시: 파일을 특정 디렉토리에 저장하는 코드 추가
            // member.setMemberProfile(fileName);
        }
        memberService.insertMember(member, memberProfile);
    }

    @GetMapping("/idCheck")
    public int idCheck(@RequestParam String id) {
        return memberService.idCheck(id);
    }

    @PostMapping("/Signup")
    public int signup(@RequestBody Member member) {
        return memberService.signup(member);
    }
}
