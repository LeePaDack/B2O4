package b2o4.controller;


import java.util.Base64;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController //html 파일 url 주소값으로 연동
@RequestMapping("/confirm")
public class PaymentController {
	//application.properties에 설정 키이름을 가져오기 위해 value
	@Value("${widgetSecretKey}") // 특정한 키이름을 외부나 다른곳에서 가져와 사용할 때는 ${키이름} 작성
	private String widgetSecretKey;
	
	@Value("${apiSecretKey}")
	private String apiSecretKey;
	
	private final RestTemplate restTemplate = new RestTemplate();
	
	private String encodeSecretKey(String secretKey) {
		return "Basic" + new String(Base64.getEncoder().encode((secretKey + ":").getBytes()));
				
	}
	
	//widget 이라는 주소로 결제정보가 들어오면 결제확인창구로 넘겨주는 것 결제정보와 결제하고자 하는 사용자의 비밀번호
	// 위젯 -> 페이먼트 브랜드페이 결제랑 결제 방식이 살짝 달라서 widget
	@PostMapping("/widget")
	public ResponseEntity<?> confirmWidget(@RequestBody Map<String, String> requestBody) {
		return confirmPayment(requestBody, encodeSecretKey(widgetSecretKey));
	}
	
	//app.post("/confirm/payment", function (req, res) {
	//payment 라는 주소로 결제 정보가 들어오면 결제 확인 창구로 넘겨주는 것 결제정보와 결제하고자 하는 사용자의 비밀번호
	@PostMapping("/payment")
	public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> requestBody) {
		return confirmPayment(requestBody, encodeSecretKey(apiSecretKey));
	}
	@PostMapping("/brandpay")
	public ResponseEntity<?> confirmBrandpay(@RequestBody Map<String, String> requestBody) {
		return confirmBrandPayment(requestBody, encodeSecretKey(apiSecretKey));
	}
	
	private ResponseEntity<?> confirmPayment(Map<String, String> requestBody, String encodedKey){
		//  fetch("https://api.tosspayments.com/v1/payments/confirm", {
		String url = "https://api.tosspayments.com/v1/payments/confirm";
		HttpHeaders headers = new HttpHeaders();
		//      Authorization: encryptedApiSecretKey,
		headers.set("Authorization", encodedKey);//encryptedApiSecretKey 을 위에서 encodedKey 작성해줬음
		//		  "Content-Type": "application/json",
		headers.set("Content-Type", "application/json");
		
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
		return new ResponseEntity<>(response.getBody(), response.getStatusCode());
	}
	
	private ResponseEntity<?> confirmBrandPayment(Map<String, String> requestBody, String encodedKey){
		//  fetch("https://api.tosspayments.com/v1/brandpay/payments/confirm", {
		String url = "https://api.tosspayments.com/v1/brandpay/payments/confirm";
		HttpHeaders headers = new HttpHeaders();
		//      Authorization: encryptedApiSecretKey,
		headers.set("Authorization", encodedKey);//encryptedApiSecretKey 을 위에서 encodedKey 작성해줬음
		//		  "Content-Type": "application/json",
		headers.set("Content-Type", "application/json");
		
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		
		// 성공했을 때와 실패했을 때
		try {
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
			return new ResponseEntity<>(response.getBody(), response.getStatusCode());
		} catch (Exception e) {
			// 사용자한테 보내는 응답,         실패메세지,           잘못된 요청으로 안됐어 라는 상태 코드 보낸것
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		

	}

}

