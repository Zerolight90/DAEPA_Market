package com.daepamarket.daepa_market_backend.controller;

import java.util.Map;
import com.daepamarket.daepa_market_backend.service.KcpEscrowService;
import com.daepamarket.daepa_market_backend.dto.KcpRegisterResponse;
import com.daepamarket.daepa_market_backend.dto.KcpStateChangeResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/escrow")
public class EscrowController {
    @Autowired
    private KcpEscrowService kcpEscrowService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> body) {
        String orderId = (String) body.get("orderId");
        String productName = (String) body.get("productName");
        int amount = (Integer) body.get("amount");
        String returnUrl = (String) body.get("returnUrl");
        try {
            KcpRegisterResponse resp = kcpEscrowService.registerTrade(orderId, productName, amount, returnUrl);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("register failed");
        }
    }

    @PostMapping("/state")
    public ResponseEntity<?> changeState(@RequestBody Map<String, Object> body) {
        String tno = (String) body.get("tno");
        String modType = (String) body.get("modType");
        Map<String, String> extra = (Map<String, String>) body.get("extra");
        try {
            KcpStateChangeResponse resp = kcpEscrowService.changeState(tno, modType, extra);
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("state change failed");
        }
    }

    // Webhook 엔드포인트
    @PostMapping("/webhook")
    public ResponseEntity<String> webhook(@RequestParam Map<String, String> params) {
        // KCP에서 전달하는 상태 변경 통보 데이터 파라미터 처리
        // ex: site_cd, tno, order_no, tx_cd, tx_tm 등
        // 내부 주문 데이터 상태 갱신, 알림 처리 등
        // 반드시 200 OK 리턴
        System.out.println("Received webhook: " + params);
        return ResponseEntity.ok("OK");
    }
}