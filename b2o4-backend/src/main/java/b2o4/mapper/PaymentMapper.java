package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.PaymentDetail;

@Mapper
public interface PaymentMapper {

	// 결재 내역 조회
	List<PaymentDetail> findPaymentsByUserId(int memberNo);
}
