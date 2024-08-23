package b2o4.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/confirm")
public class PaymentController {

	//@Value("${widgetSecretKey}")
	//private String widgetSecretKey;

	//@Value("${apiSecretKey}")
	//private String apiSecretKey;
	private final String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
	private final String apiSecretKey = "test_sk_GePWvyJnrKK5new9NblLrgLzN97E";
	private final RestTemplate restTemplate = new RestTemplate();
	private final Map<String, String> billingKeyMap = new ConcurrentHashMap<>();

	private String encodeSecretKey(String secretKey) {
	    String cleanedKey = secretKey.trim(); // Ensure no leading/trailing spaces
	    System.out.println("cleanedKey : " + cleanedKey);
	    return "Basic " + Base64.getEncoder().encodeToString((cleanedKey + ":").getBytes());
	}



	@PostMapping("/widget")
	public ResponseEntity<?> confirmWidget(@RequestBody Map<String, String> requestBody) {
		return confirmPayment(requestBody, encodeSecretKey(widgetSecretKey));
	}
/*
	@PostMapping("/payment")
	public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> requestBody) {
		 System.out.println("333333333333333333333");
		return confirmPayment(requestBody, encodeSecretKey(apiSecretKey));
	}

	@PostMapping("/brandpay")
	public ResponseEntity<?> confirmBrandpay(@RequestBody Map<String, String> requestBody) {
		return confirmBrandpayPayment(requestBody, encodeSecretKey(apiSecretKey));
	}
*/
	private ResponseEntity<?> confirmPayment(Map<String, String> requestBody, String encodedKey) {
		String url = "https://api.tosspayments.com/v1/payments/confirm";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", encodedKey);
		headers.set("Content-Type", "application/json");

		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		System.out.println("1 entity : " + entity);
		try {
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
			System.out.println("1 response : " + response);
			return new ResponseEntity<>(response.getBody(), response.getStatusCode());
		} catch (HttpClientErrorException e) {
		    System.out.println("1 e : " + e.getStatusCode() + " " + e.getResponseBodyAsString());
		    e.printStackTrace();
		    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}
/*
	private ResponseEntity<?> confirmBrandpayPayment(Map<String, String> requestBody, String encodedKey) {
		String url = "https://api.tosspayments.com/v1/brandpay/payments/confirm";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", encodedKey);
		headers.set("Content-Type", "application/json");

		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		System.out.println("2 entity : " + entity);
		try {
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
			return new ResponseEntity<>(response.getBody(), response.getStatusCode());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	*/
	
	@PostMapping("/payment")
	public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> requestBody) {
	    String url = "https://api.tosspayments.com/v1/payments/confirm";
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", encodeSecretKey(apiSecretKey));
	    headers.set("Content-Type", "application/json");

	    HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
	    System.out.println("1 entity : " + entity);
	    try {
	        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
	        System.out.println("1 response : " + response);
	        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
	    } catch (HttpClientErrorException e) {
	        System.out.println("1 e : " + e.getStatusCode() + " " + e.getResponseBodyAsString());
	        
	        if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
	            try {
	                Map<String, Object> errorResponse = new ObjectMapper().readValue(e.getResponseBodyAsString(), Map.class);
	                if ("PROVIDER_ERROR".equals(errorResponse.get("code"))) {
	                    System.out.println("Provider error detected, suppressing and continuing.");
	                    Map<String, String> successResponse = new HashMap<>();
	                    successResponse.put("message", "Payment is being processed, please check your status later.");
	                    return new ResponseEntity<>(successResponse, HttpStatus.OK);
	                }
	            } catch (Exception parsingException) {
	                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	            }
	        }
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}


}