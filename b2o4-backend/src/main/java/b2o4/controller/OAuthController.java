package b2o4.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

//import javax.servlet.http.HttpSession; javax 구버전
// import jakarta.servlet.http.HttpSession; jakarta가 신버전으로 import할 때 javax로 하게되면 에러 발생
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

/*
 * 24-07-30 NaverLogin을 한 후 로그인한 내용을 React에서 볼 수 있도록
 * NaverLoginController.java 파일을 수정
 * NaverLoginController.java 주소(api url) 충돌을 막기위해
 * @RequestMapping("/api")를 제거함
 * 
 * */
@Slf4j
@RestController
@RequestMapping("/naver") // NaverRegist와 주소 충돌을 방지하기 위해 임의로 작성
public class OAuthController {
	
	@Value("${naver.client-id}")
	private String clientId; 

	@Value("${naver.client-secret}")
	private String clientSecret;
	
	@Value("${naver.redirect-uri}")
	private String redirectUri;

	@Value("${naver.state}")
	private String state;
	
	
	@GetMapping("/naverLogin")
	public String naverLogin() {
		String api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri + "&state=" + state;
		return "<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>";
	}
	
	@GetMapping("/callback")
	public String callback(@RequestParam("code") String code, @RequestParam("state") String state, HttpSession session) {
		String api_url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
			     + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectUri + "&code=" + code + "&state=" + state;
		
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> 응답결과 = restTemplate.getForObject(api_url, Map.class);
		System.out.println("Token response : " + 응답결과);
		String accessToken = (String)응답결과.get("access_token");
		String 유저정보가담긴Url = "https://openapi.naver.com/v1/nid/me";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		HttpEntity<String> entity = new HttpEntity<>("", headers);
		ResponseEntity<Map> userInfoRes = restTemplate.exchange(유저정보가담긴Url, HttpMethod.GET, entity, Map.class);
		Map<String, Object> userInfo = userInfoRes.getBody();
		log.info("유저정보 : "+userInfo.toString());
		System.out.println(userInfo);
		session.setAttribute("userInfo", userInfo);
		return "redirect:";
	}
	
	
	// 가져온 네이버 정보를 리액트로 전달할 GetMapping
	@GetMapping("/userInfo")
	public Map<String, Object> userInfo(HttpSession session){
		//								httpSession을 Map으로 형변환
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		return userInfo;
	}
	
	
	
}




