package b2o4.dto;

import lombok.Getter;

@Getter
public class MyPage {

	// 마이페이지 회원 정보
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberBirth;
	private String memberPhone;
	private String memberAddress;
	private String signUpDate;
	private String memberRank;
	private int matchCount;
	private char memberType;
	private String memberPay;
	private String memberProfil;
}
