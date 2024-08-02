package b2o4.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Review {
	private int stadiumNo;
	private String stadiumName;
	private String stadiumLocation;
	private String stadiumAddress;
	private int stadiumCapacity;
	private char stadiumParking;
	private char stadiumInOutdoor;
	private char shoesRent;
	private int stadiumPrice;
	private String stadiumImage;
}
