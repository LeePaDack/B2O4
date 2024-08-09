package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import b2o4.dto.ShoppingBasket;
import b2o4.mapper.ShoppingBasketMapper;

@Service
public class ShoppingBasketServiceImpl implements ShoppingBasketService {
	
	//@Value("${}")
	
	@Autowired
	private ShoppingBasketMapper shoppingBasketMapper;
	
	//get
	@Override
	public List<ShoppingBasket> ShoppingBasketFindAll() {
		
		return shoppingBasketMapper.ShoppingBasketFindAll();
	}
	
	
	@Override
	public void insertBasket(ShoppingBasket shoppingBasket) {
		shoppingBasketMapper.insertBasket(shoppingBasket);
		
	}

	@Override
	public void updateBasketQuantity(ShoppingBasket basket) {
		shoppingBasketMapper.updateBasketQuantity(basket);
	}

	@Override
	public void deleteBasketItem(int basketNo) {
		shoppingBasketMapper.deleteBasketItem(basketNo);
	}

	
	
}
