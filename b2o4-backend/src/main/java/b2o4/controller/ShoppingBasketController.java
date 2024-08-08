package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.ShoppingBasket;
import b2o4.service.ShoppingBasketService;

@RestController
@RequestMapping("shoppingBasketMapper")
public class ShoppingBasketController {

	@Autowired
	private ShoppingBasketService shoppingBasketService;
	
	
	@GetMapping("/all")
	public ResponseEntity<List<ShoppingBasket>> ShoppingBasketFindAll() {
		return ResponseEntity.ok(shoppingBasketService.ShoppingBasketFindAll());
	}
	/*
	@PostMapping("/addGoods")
	public ResponseEntity<String> insertShoppingBasket(@RequestParam("basketNo") int basketNo,
													   @RequestParam("memberNo") int memberNo,
													   @RequestParam("goodsNo") int goodsNo) {
		shoppingBasketService.insertShoppingBasket(basketNo, memberNo, goodsNo);
		return ResponseEntity.ok("상품 추가 성공");
	}
	
	@PutMapping
	
	
	
	
	
	@DeleteMapping
	*/
}
