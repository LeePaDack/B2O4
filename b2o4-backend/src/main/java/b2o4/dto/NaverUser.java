package b2o4.dto;

import lombok.*;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NaverUser {
	private String id;
	private String email;
	private String nickname;
	private String name;
	private String gender;
	private String profileImage;
	private String password;
}
