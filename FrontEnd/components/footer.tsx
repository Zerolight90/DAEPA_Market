import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 daepa-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">대</span>
              </div>
              <span className="text-xl font-bold text-primary">대파</span>
            </div>
            <p className="text-sm text-muted-foreground">신선하고 안전한 중고거래의 새로운 기준</p>
            <div className="text-sm text-muted-foreground">
              <p>대표: 정상준</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 2025-서울강남-0923</p>
            </div>
          </div>

          {/* 서비스 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">서비스</h3>
            <div className="space-y-2 text-sm">
              <Link href="/how-to-sell" className="block text-muted-foreground hover:text-primary transition-colors">
                판매하는 방법
              </Link>
              <Link href="/how-to-buy" className="block text-muted-foreground hover:text-primary transition-colors">
                구매하는 방법
              </Link>
              <Link href="/safety" className="block text-muted-foreground hover:text-primary transition-colors">
                안전거래 가이드
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-primary transition-colors">
                커뮤니티
              </Link>
            </div>
          </div>

          {/* 고객지원 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">고객지원</h3>
            <div className="space-y-2 text-sm">
              <Link href="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                자주 묻는 질문
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                문의하기
              </Link>
              <Link href="/report" className="block text-muted-foreground hover:text-primary transition-colors">
                신고하기
              </Link>
              <div className="text-muted-foreground">
                <p>고객센터: 1588-1234</p>
                <p>평일 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* 정책 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">정책</h3>
            <div className="space-y-2 text-sm">
              <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/location" className="block text-muted-foreground hover:text-primary transition-colors">
                위치기반서비스 이용약관
              </Link>
              <Link href="/youth" className="block text-muted-foreground hover:text-primary transition-colors">
                청소년보호정책
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">

        </div>
      </div>
    </footer>
  )
}
