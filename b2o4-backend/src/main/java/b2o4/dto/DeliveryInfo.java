package b2o4.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryInfo {
	private int memberNo;
	private int basketNo;
	private String deliveryAddress;
	private String recipientName;
	private String recipientPhone;
	private String deliveryRequest;
	private Timestamp  createdDate;
}
