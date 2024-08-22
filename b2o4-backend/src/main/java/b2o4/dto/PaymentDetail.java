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
public class PaymentDetail {

	// 결재 내역 확인 dto
	private int reservationNo;
	private int memberNo;
	private int stadiumNo;
	private int reservationTotal;
	private String reservationDate;
	private String matchDate;
	private String matchTime;
	private int reserveCount;
	
}
