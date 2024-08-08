package b2o4.service;

import java.util.List;

import b2o4.dto.ShoppingBasket;

public interface ShoppingBasketService {

	List<ShoppingBasket> ShoppingBasketFindAll();
	
	void insertShoppingBasket (ShoppingBasket shoppingBasket);
	
	void updateShoppingBasket (ShoppingBasket shoppingBasket);
	
	void deleteShoppingBasket (int basketNo);

}
