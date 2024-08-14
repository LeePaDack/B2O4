package b2o4.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.MyPage;
import b2o4.service.MyPageService;

@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    // 회원 정보 조회
    @GetMapping("/{memberId}")
    public MyPage getMemberInfo(@PathVariable("memberId") String memberId) {
        return myPageService.getMemberInfo(memberId);
    }

    // 회원 정보 수정
    @PutMapping("/update")
    public void updateMemberInfo(
            @RequestPart("memberInfo") MyPage myPage, 
            @RequestPart(value = "memberProfile", required = false) MultipartFile memberProfile) throws Exception {
        myPageService.updateMemberInfo(myPage, memberProfile);
    }

    // 회원 탈퇴
    @DeleteMapping("/delete/{memberNo}")
    public void deleteMember(@PathVariable("memberNo") int memberNo) {
        myPageService.deleteMember(memberNo);
    }
}
