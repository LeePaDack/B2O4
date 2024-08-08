package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GoodsShop;
import b2o4.dto.ShoppingCart;

@Mapper
public interface ShoppingCartMapper {
	
	List<ShoppingCart> ShoppingCartFindAll();
	
	void insertShoppingCart(GoodsShop goodsShop);
	
	void deleteShoppingCart(int goodsNo);
	
	void updateShoppingCart(GoodsShop goodsShop);
}
