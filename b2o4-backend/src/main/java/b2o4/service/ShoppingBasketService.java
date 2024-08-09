package b2o4.service;

import java.util.List;

import b2o4.dto.ShoppingBasket;

public interface ShoppingBasketService {

	List<ShoppingBasket> ShoppingBasketFindAll();
	
	void insertBasket (ShoppingBasket shoppingBasket);
	
	void updateBasketQuantity (ShoppingBasket shoppingBasket);
	
	void deleteBasketItem (int basketNo);

}
