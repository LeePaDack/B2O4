package b2o4.service;

import java.util.List;

import b2o4.dto.PaymentDetail;

public interface PaymentDetailService {

	List<PaymentDetail> getPaymentsByUserId(int memberNo);
}
