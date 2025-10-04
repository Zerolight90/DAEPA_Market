
// -------------------------------
// (1) 채팅방/메시지/위시리스트 원본 데이터
// -------------------------------

// 임시 채팅방 목록 데이터
export const chatRooms = [
  {
    id: 1,
    unreadCount: 2,
    participant: {
      name: "친절한 다람쥐",
      avatar: "https://avatar.vercel.sh/kind-squirrel.png",
      isOnline: true,
      lastSeen: "온라인",
    },
    product: {
      title: "닌텐도 스위치 OLED 거의 새것",
      price: 320000,
      image: "/nintendo-switch-oled-white.jpg",
    },
    lastMessage: {
      content: "네, 가능합니다! 언제쯤 시간 괜찮으세요?",
      timestamp: "오후 7:12",
    },
  },
  {
    id: 2,
    unreadCount: 0,
    participant: {
      name: "열정적인 라이언",
      avatar: "https://avatar.vercel.sh/passionate-lion.png",
      isOnline: false,
      lastSeen: "오후 2:30",
    },
    product: {
      title: "에어팟 프로 2세대 판매합니다",
      price: 250000,
      image: "/airpods-pro-2nd-generation.jpg",
    },
    lastMessage: {
      content: "감사합니다! 잘 쓸게요~",
      timestamp: "오후 4:55",
    },
  },
  {
    id: 3,
    unreadCount: 0,
    participant: {
      name: "행복한 코알라",
      avatar: "https://avatar.vercel.sh/happy-koala.png",
      isOnline: true,
      lastSeen: "온라인",
    },
    product: {
      title: "캠핑용 의자 2개 세트",
      price: 45000,
      image: "/placeholder.jpg",
    },
    lastMessage: {
      content: "혹시 직거래 장소 조정 가능할까요?",
      timestamp: "오전 11:20",
    },
  },
];

// 임시 채팅 메시지 데이터
export const messages = [
  // 채팅방 1번 (닌텐도) 대화 내역
  { id: 101, chatRoomId: 1, sender: "participant", content: "안녕하세요! 닌텐도 스위치 아직 판매하시나요?", timestamp: "오후 7:05", type: "text" },
  { id: 102, chatRoomId: 1, sender: "me", content: "네, 아직 판매 중입니다. 관심 있으신가요?", timestamp: "오후 7:06", isRead: true, type: "text" },
  { id: 103, chatRoomId: 1, sender: "participant", content: "혹시 주말에 직거래 가능할까요?", timestamp: "오후 7:10", type: "text" },
  { id: 104, chatRoomId: 1, sender: "participant", content: "네, 가능합니다! 언제쯤 시간 괜찮으세요?", timestamp: "오후 7:12", type: "text" },

  // 채팅방 2번 (에어팟) 대화 내역
  { id: 201, chatRoomId: 2, sender: "me", content: "에어팟 프로 구매하고 싶습니다.", timestamp: "오후 4:50", isRead: true, type: "text" },
  { id: 202, chatRoomId: 2, sender: "participant", content: "네, 구매 가능합니다. 안전결제 해주시겠어요?", timestamp: "오후 4:51", type: "text" },
  { id: 203, chatRoomId: 2, sender: "me", content: "결제 완료했습니다! 확인 부탁드려요.", timestamp: "오후 4:54", isRead: true, type: "text" },
  { id: 204, chatRoomId: 2, sender: "participant", content: "확인했습니다. 내일 바로 편의점 택배로 보내드릴게요.", timestamp: "오후 4:54", type: "text" },
  { id: 205, chatRoomId: 2, sender: "me", content: "감사합니다! 잘 쓸게요~", timestamp: "오후 4:55", isRead: true, type: "text" },

  // 채팅방 3번 (캠핑 의자) 대화 내역
  { id: 301, chatRoomId: 3, sender: "me", content: "안녕하세요. 캠핑 의자 구매 문의드립니다.", timestamp: "오전 11:18", isRead: false, type: "text" },
  { id: 302, chatRoomId: 3, sender: "participant", content: "네 안녕하세요!", timestamp: "오전 11:19", type: "text" },
  { id: 303, chatRoomId: 3, sender: "me", content: "혹시 직거래 장소 조정 가능할까요?", timestamp: "오전 11:20", isRead: false, type: "text" },
];

// 찜한 상품 목록 데이터 (새로 추가)
export const wishlistItems = [
  {
    id: 101,
    title: "아이폰 15 Pro 256GB 스페이스 블랙 거의 새것!",
    price: 1150000,
    image: "/iphone-14-pro-purple.jpg",
    location: "서울시 강남구",
    likes: 128,
    comments: 15,
    wishlistedAt: "2023년 10월 28일",
  },
  {
    id: 102,
    title: "상태 좋은 헬리녹스 캠핑 의자 2개 팝니다",
    price: 45000,
    image: "/placeholder.jpg",
    location: "경기도 수원시",
    likes: 45,
    comments: 8,
    wishlistedAt: "2023년 10월 27일",
  },
  {
    id: 103,
    title: "소니 WH-1000XM5 노이즈캔슬링 헤드폰 (실버)",
    price: 380000,
    image: "/sony-wh-1000xm5.png",
    location: "부산시 해운대구",
    likes: 210,
    comments: 22,
    wishlistedAt: "2023년 10월 25일",
  },
  {
    id: 104,
    title: "LG 스탠바이미 Go 한정판 모델",
    price: 850000,
    image: "/placeholder.jpg",
    location: "서울시 마포구",
    likes: 98,
    comments: 5,
    wishlistedAt: "2023년 10월 22일",
  },
];

// 전체 상품(원본) — 일부 중복 ID/누락 필드 있음
export const allProducts = [
  {
    id: 101,
    title: "아이폰 15 Pro 256GB 스페이스 블랙 거의 새것!",
    price: 1150000,
    image: "/iphone-14-pro-purple.jpg",
    location: "서울시 강남구",
    likes: 128,
    comments: 15,
    wishlistedAt: "2023년 10월 28일",
  },
  {
    id: 102,
    title: "상태 좋은 헬리녹스 캠핑 의자 2개 팝니다",
    price: 45000,
    image: "/placeholder.jpg",
    location: "경기도 수원시",
    likes: 45,
    comments: 8,
    wishlistedAt: "2023년 10월 27일",
  },
  {
    id: 103,
    title: "소니 WH-1000XM5 노이즈캔슬링 헤드폰 (실버)",
    price: 380000,
    image: "/sony-wh-1000xm5.png",
    location: "부산시 해운대구",
    likes: 210,
    comments: 22,
    wishlistedAt: "2023년 10월 25일",
  },
  {
    id: 104,
    title: "LG 스탠바이미 Go 한정판 모델",
    price: 850000,
    image: "/placeholder.jpg",
    location: "서울시 마포구",
    likes: 98,
    comments: 5,
    wishlistedAt: "2023년 10월 22일",
  },
  {
    id: 101,
    title: "아이폰 15 Pro 256GB 스페이스 블랙 거의 새것!",
    price: 1150000,
    image: "/iphone-14-pro-purple.jpg",
    location: "서울시 강남구",
    likes: 128,
    comments: 15,
    wishlistedAt: "2023년 10월 28일",
  },
  {
    id: 102,
    title: "상태 좋은 헬리녹스 캠핑 의자 2개 팝니다",
    price: 45000,
    image: "/placeholder.jpg",
    location: "경기도 수원시",
    likes: 45,
    comments: 8,
    wishlistedAt: "2023년 10월 27일",
  },
  {
    id: 107,
    title: "소니 WH-1000XM5 노이즈캔슬링 헤드폰 (실버)",
    price: 380000,
    image: "/sony-wh-1000xm5.png",
    location: "부산시 해운대구",
    likes: 210,
    comments: 22,
    wishlistedAt: "2023년 10월 25일",
  },
  {
    id: 105,
    title: "LG 스탠바이미 Go 한정판 모델",
    price: 850000,
    image: "/placeholder.jpg",
    location: "서울시 마포구",
    likes: 98,
    comments: 5,
    wishlistedAt: "2023년 10월 22일",
  },
];

// -------------------------------
// (2) 제품 타입 & 정규화된 products 배열
// -------------------------------

export type Product = {
  id: number | string;
  title: string;
  price: number;
  image?: string;        // 단일 이미지 (원본 호환용)
  images?: string[];     // 다중 이미지 (UI용 표준)
  category?: string;
  condition?: string;
  likes?: number;
  comments?: number;
  chats?: number;
  views?: number;
  timeAgo?: string;
  location?: string;
  originalPrice?: number;
  isNegotiable?: boolean;
  createdAt?: string;    // 정렬 기준(ISO 문자열 추천)
};

/**
 * allProducts → UI에서 안전하게 쓰도록 정규화
 * - image만 있으면 images: [image]
 * - 누락 필드에 기본값
 */
export const products: Product[] = allProducts.map((p: any) => {
  const images = Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []);
  return {
    ...p,
    images,
    category: p.category ?? "기타",
    condition: p.condition ?? "상급",
    likes: p.likes ?? 0,
    chats: p.chats ?? p.comments ?? 0,
    views: p.views ?? 0,
    createdAt: p.createdAt ?? new Date().toISOString(),
  };
});
