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
	public void insertShoppingBasket(ShoppingBasket shoppingBasket) {
		shoppingBasketMapper.insertShoppingBasket(shoppingBasket);
		
	}
	
	@Override
	public void updateShoppingBasket(ShoppingBasket shoppingBasket) {
		
		
	}
	
	@Override
	public void deleteShoppingBasket(int basketNo) {
		// TODO Auto-generated method stub
		
	}

	
	
}
