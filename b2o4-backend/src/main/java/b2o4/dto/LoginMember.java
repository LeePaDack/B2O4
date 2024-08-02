package b2o4.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginMember {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
}
