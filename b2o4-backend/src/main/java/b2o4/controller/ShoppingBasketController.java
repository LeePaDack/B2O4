package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import b2o4.dto.ShoppingBasket;
import b2o4.service.ShoppingBasketService;

@RestController
@RequestMapping("/basket")
public class ShoppingBasketController {

	@Autowired
	private ShoppingBasketService shoppingBasketService;
	
	
	@GetMapping("/all")
	public ResponseEntity<List<ShoppingBasket>> ShoppingBasketFindAll() {
		return ResponseEntity.ok(shoppingBasketService.ShoppingBasketFindAll());
	}

	@PostMapping("/add")
	public void addGoodsToBasket(@RequestBody ShoppingBasket basket) {
		shoppingBasketService.insertBasket(basket);
	}

	@PutMapping("/update")
	public void updateBasketQuantity(@RequestBody ShoppingBasket basket) {
		shoppingBasketService.updateBasketQuantity(basket);
	}

	@DeleteMapping("/delete/{basketNo}")
	public void deleteBasketItem(@PathVariable("basketNo") int basketNo) {
		shoppingBasketService.deleteBasketItem(basketNo);
	}
}
