package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.PaymentDetail;
import b2o4.mapper.PaymentMapper;

@Service
public class PaymentDetailServiceImpl implements PaymentDetailService {

	@Autowired
	private PaymentMapper paymentMapper;
	
	@Override
	public List<PaymentDetail> getPaymentsByUserId(int memberNo) {
		return paymentMapper.findPaymentsByUserId(memberNo);
	}
}
