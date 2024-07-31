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
	private String mamberPw;
	private String mamberEmail;
	private String mamberName;
	private int mamberBirth;
	private int mamberPhone;
	private String mamberAddress;
	private String mamberProfile;
}
