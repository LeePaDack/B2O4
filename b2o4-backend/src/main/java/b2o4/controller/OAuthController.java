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

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/naver")
public class OAuthController {
	
	@Value("${naver.client-id}")
	private String clientId;
	 
	@Value("${naver.client-secret}")
	private String clientSecret; 
	
	@Value("${naver.redirect-uri}")
	private String redirectUri; 

	@Value("${naver.state}") 
	private String state;	

	
	private String redirectUris; 
	@GetMapping("/naverLogin") //http://localhost:9010/naverLogin
	public String naverLogin() {
		String api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri + "&state=" + state;
		return "<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>";
	}

	@GetMapping("/callback")
	public String callback(@RequestParam String code, @RequestParam String state ,HttpSession session) {

		String api_url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
			     + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectUri + "&code=" + code + "&state=" + state;

		RestTemplate restTemplate = new RestTemplate();
		// 여기서부터 다름
		// String, Object 앞의값은 키이름이기 때문에 String
		// 키이름에 담긴 값은 String이라는 확정을 지을 수 없으므로 Object 가져옴
		Map<String, Object> 응답결과 = restTemplate.getForObject(api_url, Map.class);
		
		System.out.println("Token response : " + 응답결과);
		
		// token 인증받은 값을 가져오는데 Bearer access_token 사용
		
		// 가져온 토큰 데이터를 문자열로 변환해서 글자처럼 사용
		String accessToken = (String) 응답결과.get("access_token"); 
		//네이버 개발자 문서에 보면 access_token 으로 로그인 허용된 값을 가져가라 작성
		
		String 유저정보가담긴Url = "https://openapi.naver.com/v1/nid/me";
		// import java.net.http.HttpHeaders; XXXXXXXXXXXXX
		// import org.springframework.http.HttpHeaders; OOOOOOOOOOOO
		HttpHeaders headers = new HttpHeaders();
		//   네이버 개발자에서 제공
		headers.set("Authorization", "Bearer " + accessToken);
		
		HttpEntity<String> entity = new HttpEntity<>("", headers);
		// HttpEntity =응답, 요청 모두 있음 상세한 기능 x  ResponseEntity RequestEntity = 각자 상세기능 보유
		
		ResponseEntity<Map> userInfoRes = restTemplate.exchange(유저정보가담긴Url, HttpMethod.GET, entity, Map.class );
		
		Map<String, Object> userInfo = userInfoRes.getBody();
		session.setAttribute("userInfo", userInfo); //session에 로그인 정보를 담겠다.
		
		
		
		/*
		HttpHeadrs 에 인증에 대한 값을 Bearer 가져오기
		인증을 위해 서버에서 제공되는 보안 토큰
		주로 사용자가 인증을 받고나서 API 요청을 할 때 사용
		
		예를 들어, 네이버에 로그인을 하고 나면 Naver 사용자에게 로그인 됐다는 토큰 발급
		추후 네이버에 로그인이 된 기록을 가지고 어떤 요청을 하면
		요청을 할 때 헤더에 Authorization:Bearer{} " 작성하고 요청을 해야함 
		
		Bearer = 소지자, 보유한 사람
		Authorization = 권한 부여
		Authorization  :   Bearer{                    }
		권한부여         :   권한을 가지고 있는 사람{"권한을 가지고 있는 번호"}
		
		 * */
		return "redirect:";
	}
	
	//가져온 네이버 정보를 리액트로 전달할 GetMapping
	@GetMapping("/userInfo")
	public Map<String, Object> userInfo(HttpSession session) {
		//	                            httpSession을 Map으로 형변환
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		return userInfo;
	}
}










