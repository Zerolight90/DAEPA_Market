"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Eye, MapPin, Clock, Grid, List } from "lucide-react"
import Link from "next/link"

import { allProducts } from "@/lib/data";

const categories = [
  "전체",
  "전자제품",
  "패션/의류",
  "생활/가전",
  "도서/음반",
  "스포츠/레저",
  "자동차",
  "반려동물",
  "기타",
]

const conditions = ["전체", "최상급", "상급", "중급", "하급"]
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "price-low", label: "낮은 가격순" },
  { value: "price-high", label: "높은 가격순" },
  { value: "popular", label: "인기순" },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedCondition, setSelectedCondition] = useState("전체")
  const [sortBy, setSortBy] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  // 필터링 로직
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory
    const matchesCondition = selectedCondition === "전체" || product.condition === selectedCondition
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice =
      (!priceRange.min || product.price >= Number.parseInt(priceRange.min)) &&
      (!priceRange.max || product.price <= Number.parseInt(priceRange.max))

    return matchesCategory && matchesCondition && matchesSearch && matchesPrice
  })

  // 정렬 로직
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
        return b.likes - a.likes
      default: // latest
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">전체 상품</h1>
          <p className="text-muted-foreground">총 {sortedProducts.length}개의 상품이 있습니다</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 필터 */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">검색</h3>
                <Input
                  placeholder="상품명으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {category}
                      {category !== "전체" && (
                        <span className="float-right text-sm text-muted-foreground">
                          {allProducts.filter((p) => p.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">상품 상태</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <button
                      key={condition}
                      onClick={() => setSelectedCondition(condition)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCondition === condition
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">가격 범위</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="최소 가격"
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  />
                  <Input
                    placeholder="최대 가격"
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPriceRange({ min: "", max: "" })}
                    className="w-full"
                  >
                    초기화
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            {/* 상단 컨트롤 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 상품 목록 */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">검색 조건에 맞는 상품이 없습니다.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("전체")
                    setSelectedCondition("전체")
                    setSearchQuery("")
                    setPriceRange({ min: "", max: "" })
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {sortedProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    {viewMode === "grid" ? (
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
                            <span className="text-xl font-bold text-primary">{product.price.toLocaleString()}원</span>
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
                    ) : (
                      <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-32 h-24 flex-shrink-0">
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.title}
                                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                  {product.title}
                                </h3>
                                <div className="flex gap-2 ml-4">
                                  <Badge variant="secondary" className="text-xs">
                                    {product.category}
                                  </Badge>
                                  <Badge
                                    variant={product.condition === "최상급" ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {product.condition}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl font-bold text-primary">
                                  {product.price.toLocaleString()}원
                                </span>
                                {product.isNegotiable && (
                                  <Badge variant="outline" className="text-xs">
                                    협의가능
                                  </Badge>
                                )}
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {product.originalPrice.toLocaleString()}원
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{product.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{product.timeAgo}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
