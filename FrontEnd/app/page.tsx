import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Eye, MapPin, Clock } from "lucide-react"
import Link from "next/link"

// 더미 데이터 - 각 카테고리별 10개씩
const featuredProducts = [
  {
    id: 1,
    title: "아이폰 14 Pro 128GB 딥퍼플",
    price: 850000,
    originalPrice: 1200000,
    location: "서울 강남구",
    timeAgo: "2시간 전",
    images: ["/iphone-14-pro-purple.jpg"],
    likes: 24,
    chats: 8,
    views: 156,
    category: "전자제품",
    condition: "상급",
    isNegotiable: true,
  },
  {
    id: 2,
    title: "맥북 에어 M2 실버 256GB",
    price: 1200000,
    originalPrice: 1690000,
    location: "서울 서초구",
    timeAgo: "1시간 전",
    images: ["/macbook-air-m2-silver.jpg"],
    likes: 18,
    chats: 12,
    views: 203,
    category: "전자제품",
    condition: "최상급",
    isNegotiable: false,
  },
  {
    id: 3,
    title: "나이키 에어맥스 270 화이트 280mm",
    price: 89000,
    originalPrice: 159000,
    location: "경기 성남시",
    timeAgo: "30분 전",
    images: ["/nike-air-max-270-white-sneakers.jpg"],
    likes: 15,
    chats: 5,
    views: 89,
    category: "패션/의류",
    condition: "상급",
    isNegotiable: true,
  },
  {
    id: 4,
    title: "다이슨 V15 무선청소기",
    price: 450000,
    originalPrice: 799000,
    location: "서울 마포구",
    timeAgo: "45분 전",
    images: ["/dyson-v15-cordless-vacuum.jpg"],
    likes: 32,
    chats: 15,
    views: 267,
    category: "생활/가전",
    condition: "상급",
    isNegotiable: true,
  },
  {
    id: 5,
    title: "삼성 갤럭시 S24 Ultra 256GB",
    price: 950000,
    originalPrice: 1398000,
    location: "서울 송파구",
    timeAgo: "1시간 전",
    images: ["/samsung-galaxy-s24-ultra-black.jpg"],
    likes: 28,
    chats: 11,
    views: 198,
    category: "전자제품",
    condition: "최상급",
    isNegotiable: false,
  },
  {
    id: 6,
    title: "해리포터 전집 (양장본)",
    price: 45000,
    originalPrice: 89000,
    location: "서울 용산구",
    timeAgo: "3시간 전",
    images: ["/harry-potter-book-collection-hardcover.jpg"],
    likes: 12,
    chats: 3,
    views: 67,
    category: "도서/음반",
    condition: "상급",
    isNegotiable: true,
  },
  {
    id: 7,
    title: "캘러웨이 골프채 세트",
    price: 380000,
    originalPrice: 650000,
    location: "경기 고양시",
    timeAgo: "2시간 전",
    images: ["/callaway-golf-club-set.jpg"],
    likes: 19,
    chats: 7,
    views: 134,
    category: "스포츠/레저",
    condition: "상급",
    isNegotiable: true,
  },
  {
    id: 8,
    title: "LG 그램 17인치 노트북",
    price: 780000,
    originalPrice: 1200000,
    location: "서울 강서구",
    timeAgo: "4시간 전",
    images: ["/lg-gram-17-inch-laptop.jpg"],
    likes: 22,
    chats: 9,
    views: 176,
    category: "전자제품",
    condition: "상급",
    isNegotiable: true,
  },
]

const categories = [
  { name: "전자제품", icon: "📱", count: "12,345" },
  { name: "패션/의류", icon: "👕", count: "8,967" },
  { name: "생활/가전", icon: "🏠", count: "6,543" },
  { name: "도서/음반", icon: "📚", count: "4,321" },
  { name: "스포츠/레저", icon: "⚽", count: "3,456" },
  { name: "자동차", icon: "🚗", count: "2,789" },
  { name: "반려동물", icon: "🐕", count: "1,234" },
  { name: "기타", icon: "📦", count: "5,678" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* 히어로 섹션 */}
        <section className="daepa-gradient text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">신선한 중고거래의 시작</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 text-pretty">대파에서 안전하고 편리하게 거래하세요</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary hover:text-primary/80">
                지금 시작하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                거래 방법 알아보기
              </Button>
            </div>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">카테고리별 상품 찾기</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category, index) => (
                <Link key={index} href={`/category/${category.name}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count}개</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 인기 상품 섹션 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">인기 상품</h2>
              <Button variant="outline" asChild>
                <Link href="/products">전체보기</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-primary">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant={product.condition === "최상급" ? "default" : "secondary"}>
                          {product.condition}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()}원</span>
                        {product.isNegotiable && (
                          <Badge variant="outline" className="text-xs">
                            협의가능
                          </Badge>
                        )}
                      </div>

                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through mb-3">
                          {product.originalPrice.toLocaleString()}원
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{product.location}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{product.timeAgo}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{product.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{product.chats}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{product.views}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">지금 바로 시작해보세요!</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              대파에서 안전하고 편리한 중고거래를 경험해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="daepa-gradient text-white hover:opacity-90">
                무료로 판매하기
              </Button>
              <Button size="lg" variant="outline">
                상품 둘러보기
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
