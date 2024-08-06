package b2o4.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Login {
	// 멤버 마이페이지, 로그인
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
