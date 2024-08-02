package b2o4.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Review {
	// 구장 리스트 보기 dto
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
	
	// 참가자 리스트 보기 dto
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberBirth;
	private String memberPhone;
	private String memberAddress;
	private String signUpDate;
	private String memberRank;
	private int matchCount;
	private char memberType;
	private String memberPay;
	private String memberProfil;
}
