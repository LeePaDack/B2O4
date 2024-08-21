package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.DeliveryInfo;
import b2o4.dto.ShoppingBasket;

@Mapper
public interface DeliveryInfoMapper {
	void insertDeliveryInfo(DeliveryInfo deliveryInfo);
}
