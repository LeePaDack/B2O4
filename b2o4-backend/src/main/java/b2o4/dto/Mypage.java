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
public class Mypage {
	String memberId;
	String memberPw;
	String memberEmail;
	String memberName;
	String memberPhone;
	String memberAddress;
	String memberProfile;
}
