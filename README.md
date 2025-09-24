```
🛠️ 주요 기술 스택
Framework: Next.js 13+

Language: TypeScript

Styling: Tailwind CSS

State Management: Recoil

Deployment: Vercel
```
```
/Front
├── 🌐 /public               # 이미지, 폰트 등 정적 에셋
│
├── 📂 /src
│   ├── 🖼️ /app              # (App Router) 페이지 및 레이아웃
│   │   ├── (main)          # 메인 페이지 관련
│   │   │   ├── page.tsx    # 🏠 메인 페이지 (상품 목록)
│   │   │   └── layout.tsx  # 뼈대가 되는 공통 레이아웃 (헤더, 푸터 등)
│   │   │
│   │   ├── /products       # 상품 관련 페이지
│   │   │   ├── /[id]       # ➡️ 상품 상세 페이지
│   │   │   └── /upload     # ➡️ 상품 등록 페이지
│   │   │
│   │   ├── /user           # 사용자 관련 페이지
│   │   │   ├── /login      # ➡️ 로그인 페이지
│   │   │   ├── /signup     # ➡️ 회원가입 페이지
│   │   │   └── /mypage     # ➡️ 마이페이지
│   │   │
│   │   └── /_components    # 특정 페이지/레이아웃에서만 사용하는 내부 컴포넌트
│   │
│   ├── 🧩 /components       # 여러 페이지에서 공통으로 사용하는 재사용 컴포넌트 (버튼, 인풋 등)
│   ├── 🎣 /hooks            # 커스텀 훅 (ex: useInput, useFetch 등)
│   ├── 💾 /store            # 전역 상태 관리 (Recoil, Zustand 등)
│   ├── 🎨 /styles           # 전역 CSS (globals.css)
│   └── 🛠️ /utils            # 유틸리티 함수 (ex: 날짜 포맷팅, 가격 콤마 등)
│
├── .eslintrc.json          # ESLint (코드 스타일 검사) 설정
├── .gitignore              # Git 추적 제외 파일 목록
├── next.config.js          # Next.js 설정
├── package.json            # 프로젝트 정보 및 의존성 목록
└── tsconfig.json           # TypeScript 설정
```
