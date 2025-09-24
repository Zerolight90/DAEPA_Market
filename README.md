```
/Front
├── /public                 # 이미지, 폰트 등 정적 파일
├── /src
│   ├── /app                # (App Router) 페이지 및 레이아웃
│   │   ├── /_components    # 페이지/레이아웃 전용 내부 컴포넌트
│   │   ├── page.tsx        # 메인 페이지
│   │   └── layout.tsx      # 공통 레이아웃
│   │
│   ├── /components         # 여러 곳에서 사용하는 공용 컴포넌트
│   ├── /hooks              # 커스텀 훅
│   ├── /store              # 전역 상태 관리 (Recoil, Zustand 등)
│   ├── /styles             # 전역 CSS
│   └── /utils              # 유틸리티 함수
│
├── .eslintrc.json          # ESLint 설정
├── .gitignore              # Git 추적 제외 파일 목록
├── next.config.js          # Next.js 설정
├── package.json            # 프로젝트 정보 및 의존성 목록
└── tsconfig.json           # TypeScript 설정
```
