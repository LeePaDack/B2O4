package b2o4.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Value("${kakao.map.api.key}")
    private String kakaoMapApiKey;

    @GetMapping("/api/kakao-map-key")
    public String getKakaoMapApiKey() {
        return kakaoMapApiKey;
    }
    
    
}