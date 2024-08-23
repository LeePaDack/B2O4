package b2o4.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
<<<<<<< HEAD
<<<<<<< HEAD
/*
 * 외부 도메인에서 요청을 주고 받을 수 있도록 허용하는 것
 * 설정을 통해 특정 도메인에서 오는 요청을 허용할 수 있고,
 * 허용할 HTTP메서드(Get, Post, Put, Delete) 지정할 수 있음
 * */
@Configuration //개발 설정
public class WebConfig implements WebMvcConfigurer{
	public void addResourceHandlers(ResourceHandlerRegistry r) {
		r.addResourceHandler("/images/**")
		 .addResourceLocations("file:C:/Users/user1/Desktop/final/");
		 	//바탕화면에 지정한 이미지 경로 넣어주기("file: + application.properties에 저장한 경로 + /")
	}
	// WebMvcConfigurer mapping을 재설정
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // http://localhost:3000/ 뒤에오는 모든 주소값 허용
		.allowedOrigins("http://localhost:3000")
		.allowedMethods("GET","POST","PUT","DELETE", "OPTIONS") //모두 주고, 받고 하는 모든 기능 허용
		.allowCredentials(true); // 쿠키나 세션과 같은 자격을 허용
	}
=======
=======
>>>>>>> leegyejun-board

@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000") //본인 포트
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
<<<<<<< HEAD
				.allowedHeaders("*")
				.allowCredentials(true); // 쿠키나 세션과 같은 자격을 허용
=======
				.allowedHeaders("*");
>>>>>>> leegyejun-board
	}
	
	// 이미지 저장 경로 접근 허용
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
<<<<<<< HEAD
                .addResourceLocations("file:C:/Users/user1/Final-Project/B2O4/b2o4-frontend/public/images/");
    }
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
=======
                .addResourceLocations("file:C:/Users/user1/Desktop/reImage/");
    }
>>>>>>> leegyejun-board
}