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
    public void insertMember(@ModelAttribute Member member,
                             @RequestParam("profileImage") MultipartFile memberProfile) {
        
        System.out.println("member: " + member);
        System.out.println("member: " + member);
        System.out.println("memberProfile: " + memberProfile);
        // 프로필 이미지 파일 및 기타 처리 로직
        memberService.insertMember(member, memberProfile);
    }



    @GetMapping("/idCheck")
    public int idCheck(@RequestParam String id) {
        return memberService.idCheck(id);
    }

}
