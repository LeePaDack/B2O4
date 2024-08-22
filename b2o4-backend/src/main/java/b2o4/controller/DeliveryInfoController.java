package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.DeliveryInfo;
import b2o4.service.DeliveryInfoService;

@RestController
@RequestMapping("/delivery")
public class DeliveryInfoController {

    @Autowired
    private DeliveryInfoService deliveryInfoService;
    
    @PostMapping("/add")
    public void addDeliveryInfo(@RequestBody DeliveryInfo info) {
        deliveryInfoService.insertDeliveryInfo(info); // 수정된 호출 방법
    }
}