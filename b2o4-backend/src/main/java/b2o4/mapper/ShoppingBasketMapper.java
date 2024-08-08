package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GoodsShop;
import b2o4.dto.ShoppingBasket;

@Mapper
public interface ShoppingBasketMapper {
	
	List<ShoppingBasket> ShoppingBasketFindAll();
	
	void insertShoppingBasket(ShoppingBasket shoppingBasket);
	
	void deleteShoppingBasket(int BasketNo);
	
	void updateShoppingBasket(ShoppingBasket shoppingBasket);
}
