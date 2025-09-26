// pages/checkout.tsx (예시)
import { useState } from 'react';

export default function Checkout() {
  const [response, setResponse] = useState<any>(null);

  async function startEscrow() {
    const resp = await fetch('/api/escrow/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: 'ORDER123456',
        productName: '테스트 상품',
        amount: 10000,
        returnUrl: 'https://your-domain.com/escrow/return'
      }),
    });
    const data = await resp.json();
    setResponse(data);
    // 응답에 pay_url 등이 있으면 iframe 또는 redirect
    if (data.pay_url) {
      window.location.href = data.pay_url;
    }
  }

  return (
    <div>
      <h1>결제 테스트</h1>
      <button onClick={startEscrow}>결제하기 (에스크로)</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}