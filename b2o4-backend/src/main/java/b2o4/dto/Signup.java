package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Signup {
	private int memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private int memberBirth;
	private int memberPhone;
	private String memberAddress;
	private String memberProfile;
}
