package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GoodsShop;
import b2o4.dto.ShoppingBasket;

@Mapper
public interface ShoppingBasketMapper {
	
	List<ShoppingBasket> ShoppingBasketFindAll();
	
	void insertBasket(ShoppingBasket shoppingBasket);
	
	void deleteBasketItem(int BasketNo);
	
	void updateBasketQuantity(ShoppingBasket shoppingBasket);
}
