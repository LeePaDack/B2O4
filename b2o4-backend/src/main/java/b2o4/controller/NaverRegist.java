package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.NaverUser;
import b2o4.service.NaverUserService;

@RestController
public class NaverRegist {

	@Autowired
	private NaverUserService naverUserService;
	
	//회원가입을 위한 Post Mapping 작성
	@PostMapping("/naverAPI/register") //포론트와 데이터를 주고 받기 위한 만남의 장소 url api 부름
			public String insertNaverUser(@RequestBody NaverUser naverUser) {
		
		// DB에서 React로 가져온 naverUser정보를 큰 수정 없이 전체 다 넣겠다.
		naverUserService.insertNaverUser(naverUser);
		//naverUserService.insertNaverUser(null);
		// null 이 들어갈 자리에는 React에서 받아온 값을 넣어주는 공간
		// 처음에는 Java에서 어떤 값을 넣어줘야 할지 모르기 떄문에 null 로 설정잉 되어있는 것일 뿐
		// null 자리에는 @RequestBody 나 @RequestParam으로 가져온 값을 작성
		// @RequestBody = 전체 (=전체를 한 번에 집어 넣는다는 것은 부분적으로 수정이거나 커스텀이 필요하지
		// @RequestParam = 부분 수정 추가, 부분적으로 추가할 떄 사용
		return "Naver API를 활용한 회원가입 성공 !!!!";
	}

}