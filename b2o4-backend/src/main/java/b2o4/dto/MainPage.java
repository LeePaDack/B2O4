package b2o4.dto;

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
public class MainPage {

	//스타디움
	private String stadiumName;
	private String stadiumImage;
	private int totalLike;
	
	//갤러리 
	private int GBPostNo;
	private String GBPostTitle;
	private String GBImages;
	
	//기어샵
	private int goodsNo;
	private String goodsName;
	private String goodsImage;
}
