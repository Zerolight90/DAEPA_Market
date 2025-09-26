package com.daepamarket.daepa_market_backend.dto;

public class KcpRegisterRequest {
    private String site_cd;
    private String ordr_idxx;
    private String good_mny;
    private String good_name;
    private String pay_method;  // 예: "ACNT"
    private String escw_used;   // "Y"
    private String Ret_URL;     // 리턴 URL
    private String bask_cntx;
    private String good_info;
    // + 수취인 정보 (rcvr_name, rcvr_tel1, rcvr_tel2, ...)
    // getters / setters
}
