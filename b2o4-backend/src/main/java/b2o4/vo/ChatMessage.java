package b2o4.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String content;
    private String profile;
    private String viewedTime;
    private String formattedTime;
    
}