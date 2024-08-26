package b2o4.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberPhone;
	private String memberEmail;
	private String memberAddress;
	private String memberBirth;
	private String memberProfile;
}