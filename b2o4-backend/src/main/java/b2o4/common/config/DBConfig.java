package b2o4.common.config;

<<<<<<< HEAD
import java.io.IOException;
=======
>>>>>>> leegyejun-board

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
<<<<<<< HEAD
//import org.apache.catalina.core.ApplicationContext;
=======
>>>>>>> leegyejun-board
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

<<<<<<< HEAD
// classpath = src/main/resources 줄임말
=======
>>>>>>> leegyejun-board
@Configuration
@PropertySource("classpath:/config.properties")
public class DBConfig {

	@Autowired
<<<<<<< HEAD
	//import org.springframework.context.ApplicationContext;
	private ApplicationContext applicationContext; // 연결되는 주소 관리자 나중에 xml과 같은 경로를 보유하고 관리
	
<<<<<<< HEAD
	
	@Bean // 객체생성 히카리 사용하겠다 선언!
	@ConfigurationProperties(prefix = "spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		HikariConfig config = new HikariConfig();
		return new HikariConfig(); // hikari DataBase 연결을 도와주는 라이브러리 
	}
	
	
	@Bean // 객체생성 DataBase연결을 해주겠다.
=======
=======
	private ApplicationContext applicationContext;
	
>>>>>>> leegyejun-board
	@Bean 
	@ConfigurationProperties(prefix = "spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		return new HikariConfig();
	}
	
	@Bean
<<<<<<< HEAD
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
=======
>>>>>>> leegyejun-board
	public DataSource dataSource(HikariConfig config) {
		DataSource dataSource = new HikariDataSource(config);
		return dataSource;
	}
	
	@Bean
	public SqlSessionFactory sessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sfb = new SqlSessionFactoryBean();
<<<<<<< HEAD
<<<<<<< HEAD
		sfb.setDataSource(dataSource); //HikariConfig에서 받은 정보로 연결한 DataBase 연결 경로를 가져와서 사용
		sfb.setMapperLocations(applicationContext.getResources("classpath:/mappers/**.xml"));
		sfb.setTypeAliasesPackage("b2o4.dto"); 
		// 나중에 본인의 dto 패키지명 변경 dataBase 작성한 컬럼값과 dto에 작성한 변수명 대조
		
		//우리가 나중에 컬럼명을 dto에서 카멜케이스나 dto용법으로 작성했을 때 작성값 설정
		sfb.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
		return sfb.getObject();
	}
	
	
	@Bean //sql 작성한 select insert delete update 이용한 dataBase 작업을 관리
=======
=======
>>>>>>> leegyejun-board
		sfb.setDataSource(dataSource); 
		sfb.setMapperLocations(applicationContext.getResources("classpath:/mappers/**.xml"));
		sfb.setTypeAliasesPackage("b2o4.dto");
		return sfb.getObject();
	}
	
	@Bean 
<<<<<<< HEAD
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
=======
>>>>>>> leegyejun-board
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sf) {
		return new SqlSessionTemplate(sf);
	}
	
<<<<<<< HEAD
	@Bean // commit rollback 과 같은 수정하거나 삭제하거나 추가했을 때 완전하게 DB에 저장하거나 되돌릴 수 있도록 도와줌
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource ds) {
		return new DataSourceTransactionManager(ds);
		// insert delete update commit을 하지 않으면 완벽하게 저장이 안된 상태에서 select 를 진행하기 때문에
		// 저장을 안해서 안보이는 상황이라 여기지 않고, 코드 상이나 흐름에 문제가 있다고 생각할 수 있기 때문에 commit 진행 매니저 생성
	}
<<<<<<< HEAD
}












=======
	
}
>>>>>>> 2d67df7a0ce3af9babe310a0891221ef3bd63003
=======
	@Bean
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource ds) {
		return new DataSourceTransactionManager(ds);
	}
	
}
>>>>>>> leegyejun-board
