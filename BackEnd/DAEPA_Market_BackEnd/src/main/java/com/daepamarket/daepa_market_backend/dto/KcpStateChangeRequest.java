package com.daepamarket.daepa_market_backend.dto;

public class KcpStateChangeRequest {
    private String site_cd;
    private String kcp_cert_info;
    private String tno;
    private String kcp_sign_data;
    private String mod_type;
    // 배송 시작이면 deli_corp, deli_numb 등
    // 구매확정이면 st_cd, can_msg 등
    // getters / setters
}