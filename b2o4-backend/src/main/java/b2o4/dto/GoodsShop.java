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
public class GoodsShop {
	private int goodsNo;
	private String goodsName;
	private int goodsKind;
	private int goodsPrice;
	private String goodsImage;
	private String goodsComment;
	private String goodsSize;
	private int goodsSellNow;

}
