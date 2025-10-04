"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Eye,
  MapPin,
  Clock,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { allProducts } from "@/lib/data" // Import centralized data

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Find the product from the centralized data source
  const product = allProducts.find((p) => p.id === parseInt(productId))

  // Generate related products (from the same category, excluding the current one)
  const relatedProducts = product
    ? allProducts.filter(
        (p) => p.category === product.category && p.id !== product.id
      ).slice(0, 4) // Show up to 4 related products
    : []

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
            <Button asChild>
              <Link href="/products">상품 목록으로 돌아가기</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  // Ensure optional fields have fallbacks
  const seller = product.seller || { name: '알 수 없음', avatar: '', rating: 0, reviewCount: 0, responseRate: 0, responseTime: '-', joinDate: '-', verifiedPhone: false, verifiedEmail: false };
  const shipping = product.shipping || { freeShipping: false, shippingCost: 0, estimatedDays: '-' };
  const safety = product.safety || { safePayment: false, returnPolicy: false, warranty: false };


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            전체상품
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant={product.condition === "최상급" ? "default" : "secondary"}>{product.condition}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Flag className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-balance">{product.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">{product.price.toLocaleString()}원</span>
                {product.isNegotiable && <Badge variant="outline">협의가능</Badge>}
              </div>

              {product.originalPrice && (
                <div className="text-lg text-muted-foreground line-through mb-4">
                  정가 {product.originalPrice.toLocaleString()}원
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{product.timeAgo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>조회 {product.views}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  안전거래 정보
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>안전결제</span>
                    <span className={safety.safePayment ? "text-green-600" : "text-muted-foreground"}>
                      {safety.safePayment ? "지원" : "미지원"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>반품정책</span>
                    <span className={safety.returnPolicy ? "text-green-600" : "text-muted-foreground"}>
                      {safety.returnPolicy ? "7일 반품가능" : "반품불가"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>배송정보</span>
                    <span className="text-muted-foreground">
                      {shipping.freeShipping
                        ? "무료배송"
                        : `배송비 ${shipping.shippingCost.toLocaleString()}원`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button size="lg" className="w-full daepa-gradient text-white hover:opacity-90">
                <MessageCircle className="w-5 h-5 mr-2" />
                채팅하기
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5 mr-2" />
                  찜하기 ({product.likes})
                </Button>
                <Button size="lg" variant="outline">
                  전화하기
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">상품 설명</h2>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-foreground">{product.description || '상세 설명이 없습니다.'}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">판매자 정보</h2>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={seller.avatar || "/placeholder-user.jpg"} alt={seller.name} />
                    <AvatarFallback>{seller.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{seller.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{seller.rating}</span>
                        <span className="text-sm text-muted-foreground">({seller.reviewCount}개 리뷰)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      다른 상품 보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">이런 상품은 어떠세요?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                    <div className="relative">
                      <img
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-primary">{relatedProduct.price.toLocaleString()}원</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
