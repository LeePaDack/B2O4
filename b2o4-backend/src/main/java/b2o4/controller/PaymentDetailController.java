package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.PaymentDetail;
import b2o4.service.PaymentDetailService;

@RestController
@RequestMapping("/api/payments")
public class PaymentDetailController {

	@Autowired
	private PaymentDetailService paymentDetailService;
	
	@GetMapping("/user/{memberNo}")
	public ResponseEntity<List<PaymentDetail>> getPaymentsByUserId(@PathVariable("memberNo") int memberNo) {
		List<PaymentDetail> payments = paymentDetailService.getPaymentsByUserId(memberNo);
		return ResponseEntity.ok(payments);
	}
}
