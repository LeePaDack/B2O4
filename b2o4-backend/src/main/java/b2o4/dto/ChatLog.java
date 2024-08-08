package b2o4.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatLog {

	private int msgNo;
	private String memberId;
	private String msgContent;
	private LocalDateTime msgAt;
}
