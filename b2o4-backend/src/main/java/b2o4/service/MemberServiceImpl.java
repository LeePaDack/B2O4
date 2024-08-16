package b2o4.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.Member;
import b2o4.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberMapper memberMapper;

    @Override
    public List<Member> findAllMember() {
        return memberMapper.findAllMember();
    }

    @Override
    public void insertMember(Member member, MultipartFile memberProfile) {
        memberMapper.insertMember(member);
    }

    @Override
    public int idCheck(String memberId) {
        return memberMapper.idCheck(memberId);
    }

    @Override
    public int signup(Member member) {
        return memberMapper.signup(member);
    }
}
