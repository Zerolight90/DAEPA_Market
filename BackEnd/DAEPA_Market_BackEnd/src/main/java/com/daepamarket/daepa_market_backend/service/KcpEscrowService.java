package com.daepamarket.daepa_market_backend.service;

import java.security.PrivateKey;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.daepamarket.daepa_market_backend.dto.KcpRegisterRequest;
import com.daepamarket.daepa_market_backend.dto.KcpRegisterResponse;
import com.daepamarket.daepa_market_backend.dto.KcpStateChangeRequest;
import com.daepamarket.daepa_market_backend.dto.KcpStateChangeResponse;

import jakarta.annotation.PostConstruct;

@Service
public class KcpEscrowService {
    @Value("${kcp.siteCd}")
    private String siteCd;
    @Value("${kcp.api.register}")
    private String registerUrl;
    @Value("${kcp.api.stateChange}")
    private String stateUrl;
    @Value("${kcp.certKeyPath}")
    private String certKeyPath; // 인증서 파일 내용
    @Value("${kcp.privateKey}")
    private String privateKeyPem;

    private PrivateKey privateKey;

    @PostConstruct
    public void init() throws Exception {
        // privateKeyPem 또는 certKeyPath 통해 PrivateKey 객체 초기화
        // (pem 파싱 등 로직 필요)
    }

    public KcpRegisterResponse registerTrade(String orderId, String goodName, int amount, String returnUrl) throws Exception {
        KcpRegisterRequest req = new KcpRegisterRequest();
        req.setSite_cd(siteCd);
        req.setOrdr_idxx(orderId);
        req.setGood_mny(String.valueOf(amount));
        req.setGood_name(goodName);
        req.setPay_method("ACNT");  // 예: 계좌 이체
        req.setEscw_used("Y");
        req.setRet_URL(returnUrl);

        // 장바구니 설정 — 단일 상품 예
        req.setBask_cntx("1");
        // good_info 규격: seq=1 + chr31 + ordr_numb=... + chr31 + good_name=... + chr31 + good_cntx=1 + chr31 + good_amtx=amount
        char chr31 = (char) 31;
        StringBuilder sb = new StringBuilder();
        sb.append("seq=1").append(chr31)
          .append("ordr_numb=").append(orderId).append(chr31)
          .append("good_name=").append(goodName).append(chr31)
          .append("good_cntx=1").append(chr31)
          .append("good_amtx=").append(amount);
        req.setGood_info(sb.toString());

        // HTTP POST 요청 (form 또는 application/x-www-form-urlencoded 방식)
        // 예: RestTemplate 또는 WebClient 이용
        // 응답 JSON 또는 form-encoded 응답을 파싱해서 KcpRegisterResponse로 반환
    }

    public KcpStateChangeResponse changeState(String tno, String modType, Map<String, String> extraParams) throws Exception {
        KcpStateChangeRequest req = new KcpStateChangeRequest();
        req.setSite_cd(siteCd);
        // 인증서 정보 (kcp_cert_info) - PEM 내용 직렬화해서 전달
        req.setKcp_cert_info(loadCertInfo());  
        req.setTno(tno);
        req.setMod_type(modType);

        // sign 데이터 생성: site_cd + "^" + tno + "*" + mod_type
        String signData = siteCd + "^" + tno + "*" + modType;
        String sign = KcpSignUtil.makeSign(signData, privateKey);
        req.setKcp_sign_data(sign);

        // extraParams (예: 배송 시작이면 deli_corp, deli_numb 등) 설정

        // HTTP POST 요청 → 응답 받기 → KcpStateChangeResponse
    }

    private String loadCertInfo() {
        // 인증서 PEM 파일을 줄바꿈 포함 문자열로 읽어서 리턴
        return "...";
    }
}
