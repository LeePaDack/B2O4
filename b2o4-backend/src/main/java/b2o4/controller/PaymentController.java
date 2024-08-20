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
	
	/*****
	Entity
	HttpEntity : Http 요청 또는 응답의 본문(body)과 헤더(headers)를 포함하는 객체
	Http 요청을 보낼 때 본문과 헤더를 설정하고자 할 때 보냄
	본문(body) : 실제 전송될 데이트 Ex) 아이디 비밀번호 작성한글 등
	헤더(header) : Http 헤더 정보를 포함 Ex) 글자인지 이미지인지 동성상인지 어떤 파일의 것인가? 누가보내나?
	HttpEntity<문자열이면 문자열, 숫자면 숫자, 모르겠으면 비워두기> abc = new Http<비워져있어도 상관없음>("요청본문")
	
	ResponseEntity (Response = 응답 / Http 를 상속받아서 Http 기능 응답에 대한 기능을 추가로 설정한 Entity) 
			: HttpEntity 를 상속받아, Http 응답에 대한 추가적인 정보를 제공 상태코드를 포함하고 있어서
			  클라이언트(사용자)에게 응답을 보낼 때 사용
	ReponseEntitiy<String 이면 String, Integer 이면 Integer  어려값이면 ?, 모르겠으면 비워두기?> res = new ResponseEntity<>("응답본문",headers); 
		
	ReQuestEntity (Request = 요청 / Http 를 상속받아서 Http 기능 요청에 대한 기능을 추가로 설정한 Entity) 
			: HttpEntity 를 상속해, Http 요청에 대한 추가적인 정보를 제공
			URI 와 HTTP 메서드 (GET, POST, PUT, DELETE) 를 포함하고 있어, 서버로 요청을 보낼 때 주로 사용
	ReQuestEntity<String이면String, Integer 이면 Integer, 여러값이면 ?, 모르겠으면 비워두기> req = new RequestEntity<>("요청본문",headers);
	ReQuestEntity<String> req = new RequestEntity<>("요청본문",headers, HttpMethod.Post, url);
	
	차이점 요약
	  클래스 						상속관계 					주요 사용 목적					추가 정보
	HttpEntity					기본 클래스			HTTP 요청/응답 본문과 헤더 포함		상태 코드 없음(성공여부)
	ResponseEntity				HttpEntity상속		HTTP 응답 반환						상태 코드 포함(성공여부)
	RequestEntity				HttpEntity상속		HTTP 요청 전송 					URI 와 HTTP 메서드 포함

	HTTP : 웹에서 데이터를 전송하기 위한 전송수단
	
	
	
	
	URI 와 URL 차이
	URI = 주소값과 식별값이 들어있음, 이 안에 URL 이 들어있음
	URL = URI 의 한 종류로 주소이름
	+
	URN = 고유한 이름
	
	 */
}

