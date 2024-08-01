package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LiveChatMessage {
	
    private String sender;
    private String content;
    private MessageType type;

    // getters and setters

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}