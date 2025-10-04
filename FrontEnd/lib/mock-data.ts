export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: '아이폰 14 프로 퍼플',
    description: '새것 같은 상태의 아이폰 14 프로입니다. 스크래치 거의 없어요.',
    price: 1200000,
    image: '/iphone-14-pro-purple.jpg',
    seller: {
      name: '김민준',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '2일 전',
  },
  {
    id: '2',
    name: '맥북 에어 M2 실버',
    description: 'M2 칩 탑재 맥북 에어. 가벼운 작업용으로 사용했습니다.',
    price: 1350000,
    image: '/macbook-air-m2-silver.jpg',
    seller: {
      name: '이서아',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '5시간 전',
  },
  {
    id: '3',
    name: '소니 WH-1000XM5 헤드폰',
    description: '최고의 노이즈 캔슬링을 경험하세요. 사용 횟수 적습니다.',
    price: 380000,
    image: '/sony-wh-1000xm5.png',
    seller: {
      name: '박도윤',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '1일 전',
  },
  {
    id: '4',
    name: '에어팟 프로 2세대',
    description: '애플케어플러스 가입된 제품입니다. 모든 구성품 다 있어요.',
    price: 250000,
    image: '/airpods-pro-2nd-generation.jpg',
    seller: {
      name: '최은우',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '1주 전',
  },
  {
    id: '5',
    name: '닌텐도 스위치 OLED 화이트',
    description: '조이콘 쏠림 현상 없고, 상태 아주 좋습니다. 게임 칩 포함.',
    price: 350000,
    image: '/nintendo-switch-oled-white.jpg',
    seller: {
      name: '정하린',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '3일 전',
  },
  {
    id: '6',
    name: '다이슨 V15 무선 청소기',
    description: '강력한 흡입력의 다이슨 청소기입니다. 배터리 성능 좋아요.',
    price: 750000,
    image: '/dyson-v15-cordless-vacuum.jpg',
    seller: {
      name: '조서준',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '10시간 전',
  },
  {
    id: '7',
    name: '루이비통 네버풀 MM 모노그램',
    description: '정품 루이비통 네버풀입니다. 사용감 거의 없는 A급.',
    price: 1800000,
    image: '/louis-vuitton-neverfull-mm-monogram.jpg',
    seller: {
      name: '윤지아',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '12시간 전',
  },
  {
    id: '8',
    name: '나이키 에어맥스 270 화이트',
    description: '편안한 착화감의 나이키 에어맥스입니다. 사이즈 270mm.',
    price: 85000,
    image: '/nike-air-max-270-white-sneakers.jpg',
    seller: {
      name: '임시우',
      avatar: '/placeholder-user.jpg',
    },
    createdAt: '4일 전',
  },
];
