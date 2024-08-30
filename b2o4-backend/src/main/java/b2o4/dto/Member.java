package b2o4.dto;
import lombok.*;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberPhone;
	private String memberAddress;
	private String memberDetailAddress;
	private String memberBirth;
	private String memberProfile;
	private char memberType;
}