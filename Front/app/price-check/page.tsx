/**
 * 페이지 목적: 중고 시세 조회 (데모용)
 * - 실제 API 없이도 임의 데이터로 평균/최저/최고/분포/리스트를 바로 보여줌
 * - 검색어/카테고리/지역/기간 필터 + 간단한 스파크라인(Inline SVG)
 */

"use client"

import { useMemo, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Search, MapPin, Calendar, Tag } from "lucide-react"
import Link from "next/link"

// ---------------------------
// 1) 데모 데이터 (임의)
// ---------------------------
type PriceSample = {
  id: number | string
  title: string
  category: string
  region: string
  price: number
  condition: "최상급" | "상급" | "중급" | "하급"
  postedAt: string // ISO or display
  image?: string
}

type PriceTrendPoint = {
  date: string // YYYY-MM-DD
  avgPrice: number
}

const DEMO_LISTINGS: PriceSample[] = [
  { id: 1, title: "아이폰 15 Pro 256GB 스페이스 블랙", category: "전자제품", region: "서울", price: 1140000, condition: "최상급", postedAt: "2025-09-10", image: "/iphone-14-pro-purple.jpg" },
  { id: 2, title: "아이폰 15 Pro 256GB 티타늄", category: "전자제품", region: "경기", price: 1090000, condition: "상급", postedAt: "2025-09-11", image: "/placeholder.jpg" },
  { id: 3, title: "아이폰 15 Pro 128GB 블랙", category: "전자제품", region: "부산", price: 980000, condition: "상급", postedAt: "2025-09-08", image: "/placeholder.jpg" },
  { id: 4, title: "아이폰 15 Pro 256GB 실버", category: "전자제품", region: "서울", price: 1120000, condition: "최상급", postedAt: "2025-09-13", image: "/placeholder.jpg" },
  { id: 5, title: "아이폰 15 Pro 256GB 블루 - 미개봉급", category: "전자제품", region: "인천", price: 1180000, condition: "최상급", postedAt: "2025-09-14", image: "/placeholder.jpg" },
  { id: 6, title: "아이폰 15 Pro 256GB 사용감 있음", category: "전자제품", region: "대구", price: 990000, condition: "중급", postedAt: "2025-09-07", image: "/placeholder.jpg" },
  { id: 7, title: "아이폰 15 Pro 512GB", category: "전자제품", region: "서울", price: 1350000, condition: "상급", postedAt: "2025-09-12", image: "/placeholder.jpg" },
  { id: 8, title: "아이폰 15 Pro 256GB 생활 스크래치", category: "전자제품", region: "광주", price: 965000, condition: "중급", postedAt: "2025-09-05", image: "/placeholder.jpg" },
]

const DEMO_TREND: PriceTrendPoint[] = [
  { date: "2025-08-20", avgPrice: 1050000 },
  { date: "2025-08-25", avgPrice: 1065000 },
  { date: "2025-08-30", avgPrice: 1078000 },
  { date: "2025-09-04", avgPrice: 1090000 },
  { date: "2025-09-09", avgPrice: 1105000 },
  { date: "2025-09-14", avgPrice: 1118000 },
  { date: "2025-09-19", avgPrice: 1123000 },
]

// 선택 옵션
const CATEGORY_OPTIONS = ["전체", "전자제품", "패션/의류", "생활/가전", "도서/음반", "스포츠/레저", "자동차", "반려동물", "기타"]
const REGION_OPTIONS = ["전체", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종"]
const PERIOD_OPTIONS = [
  { value: "7d", label: "최근 7일" },
  { value: "30d", label: "최근 30일" },
  { value: "90d", label: "최근 90일" },
]

// ---------------------------
// 2) 유틸
// ---------------------------
function calcStats(list: PriceSample[]) {
  if (list.length === 0) {
    return { avg: 0, min: 0, max: 0, median: 0 }
  }
  const prices = list.map((p) => p.price).sort((a, b) => a - b)
  const sum = prices.reduce((a, b) => a + b, 0)
  const avg = Math.round(sum / prices.length)
  const min = prices[0]
  const max = prices[prices.length - 1]
  const mid = Math.floor(prices.length / 2)
  const median = prices.length % 2 === 0 ? Math.round((prices[mid - 1] + prices[mid]) / 2) : prices[mid]
  return { avg, min, max, median }
}

function numberKR(n: number) {
  return n.toLocaleString("ko-KR")
}

// 스파크라인 Path 생성 (0~1 정규화)
function makeSparklinePath(points: number[], width = 240, height = 60) {
  if (points.length === 0) return ""
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = Math.max(1, max - min)
  const stepX = width / (points.length - 1 || 1)

  const toY = (v: number) => height - ((v - min) / range) * height
  const d = points
      .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX},${toY(v)}`)
      .join(" ")
  return d
}

// ---------------------------
// 3) 페이지
// ---------------------------
export default function PriceCheckPage() {
  const [query, setQuery] = useState("아이폰 15 Pro 256GB")
  const [category, setCategory] = useState("전자제품")
  const [region, setRegion] = useState("전체")
  const [period, setPeriod] = useState("30d")

  // 데모: 기간 필터는 목록 필터엔 영향 X (트렌드 라인에만 영향 주는 척)
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DEMO_LISTINGS.filter((item) => {
      const matchQ = q === "" || item.title.toLowerCase().includes(q)
      const matchC = category === "전체" || item.category === category
      const matchR = region === "전체" || item.region === region
      return matchQ && matchC && matchR
    })
  }, [query, category, region])

  const stats = useMemo(() => calcStats(filteredList), [filteredList])

  // 트렌드 (기간에 따라 마지막 N포인트만 자르는 모양)
  const trendPoints = useMemo(() => {
    const base = DEMO_TREND
    let cut = base
    if (period === "7d") cut = base.slice(-3)
    if (period === "30d") cut = base.slice(-5)
    if (period === "90d") cut = base // 그대로
    const prices = cut.map((p) => p.avgPrice)
    const d = makeSparklinePath(prices)
    const prev = cut.length >= 2 ? cut[cut.length - 2].avgPrice : prices[0]
    const last = prices[prices.length - 1] ?? 0
    const dir: "up" | "down" | "flat" = last > prev ? "up" : last < prev ? "down" : "flat"
    const diff = last - prev
    return { cut, pathD: d, dir, diff, last }
  }, [period])

  const dirIcon =
      trendPoints.dir === "up" ? <TrendingUp className="w-4 h-4" /> : trendPoints.dir === "down" ? <TrendingDown className="w-4 h-4" /> : null
  const dirBadge =
      trendPoints.dir === "up" ? (
          <Badge className="bg-green-600 hover:bg-green-600/90">상승 {numberKR(Math.abs(trendPoints.diff))}원</Badge>
      ) : trendPoints.dir === "down" ? (
          <Badge className="bg-red-600 hover:bg-red-600/90">하락 {numberKR(Math.abs(trendPoints.diff))}원</Badge>
      ) : (
          <Badge variant="secondary">보합</Badge>
      )

  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* 헤더 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">시세 조회</h1>
            <p className="text-muted-foreground">키워드와 필터를 설정하면 유사 매물 기준의 시세 추정치를 보여드립니다. (데모 데이터)</p>
          </div>

          {/* 검색/필터 */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex gap-2">
                    <Input
                        placeholder="예) 아이폰 15 Pro 256GB"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={() => { /* 데모: 클라이언트 필터만 */ }}>
                      <Search className="w-4 h-4 mr-2" />
                      조회
                    </Button>
                  </div>
                </div>

                <div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGION_OPTIONS.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="기간" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERIOD_OPTIONS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 핵심 요약 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">평균가</div>
                <div className="text-2xl font-bold">{numberKR(stats.avg)}원</div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  {dirIcon}
                  {dirBadge}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">최저가</div>
                <div className="text-2xl font-bold">{numberKR(stats.min)}원</div>
                <div className="mt-2 text-xs text-muted-foreground">가성비 구매 하한선</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">최고가</div>
                <div className="text-2xl font-bold">{numberKR(stats.max)}원</div>
                <div className="mt-2 text-xs text-muted-foreground">미개봉/상태 최상 기준</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">중앙값</div>
                <div className="text-2xl font-bold">{numberKR(stats.median)}원</div>
                <div className="mt-2 text-xs text-muted-foreground">체감 시세 중심</div>
              </CardContent>
            </Card>
          </div>

          {/* 트렌드(스파크라인) */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <h2 className="text-lg font-semibold">최근 시세 추이</h2>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                  {trendPoints.cut[0]?.date ?? ""} ~ {trendPoints.cut[trendPoints.cut.length - 1]?.date ?? ""}
                </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border bg-background">
                <svg width="100%" height="80" viewBox="0 0 240 60" preserveAspectRatio="none" role="img" aria-label="시세 스파크라인">
                  <path d={trendPoints.pathD} fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                현재 평균가: <span className="font-medium text-foreground">{numberKR(trendPoints.last)}원</span>
              </div>
            </CardContent>
          </Card>

          {/* 유사 매물 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 w-16">사진</th>
                      <th className="text-left p-3">제목</th>
                      <th className="text-left p-3">상태</th>
                      <th className="text-right p-3">가격</th>
                      <th className="text-left p-3">지역</th>
                      <th className="text-left p-3">등록일</th>
                      <th className="text-center p-3">바로가기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredList.map((row) => (
                        <tr key={row.id} className="border-t hover:bg-accent/30">
                          <td className="p-3">
                            <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                              <img src={row.image ?? "/images/placeholder-product.svg"} alt={row.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium line-clamp-1">{row.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {row.region} · {row.category}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant={row.condition === "최상급" ? "default" : "secondary"}>{row.condition}</Badge>
                          </td>
                          <td className="p-3 text-right font-semibold">{numberKR(row.price)}원</td>
                          <td className="p-3">{row.region}</td>
                          <td className="p-3">{row.postedAt}</td>
                          <td className="p-3 text-center">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/product/${row.id}`}>보기</Link>
                            </Button>
                          </td>
                        </tr>
                    ))}
                    {filteredList.length === 0 && (
                        <tr>
                          <td className="p-6 text-center text-muted-foreground" colSpan={7}>
                            조건에 맞는 매물이 없습니다.
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* 가격 분포 (간단한 구간 카드) */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold mb-3">가격 레인지</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span>100만원 미만</span>
                      <span className="font-medium">
                      {DEMO_LISTINGS.filter((x) => x.price < 1000000).length}건
                    </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>100~120만원</span>
                      <span className="font-medium">
                      {DEMO_LISTINGS.filter((x) => x.price >= 1000000 && x.price < 1200000).length}건
                    </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>120만원 이상</span>
                      <span className="font-medium">
                      {DEMO_LISTINGS.filter((x) => x.price >= 1200000).length}건
                    </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold mb-3">가이드</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-start gap-2">
                      <ArrowDownRight className="w-4 h-4 mt-0.5" />
                      <p>평균가보다 5% 낮게 등록하면 빠른 판매 가능성이 높습니다.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 mt-0.5" />
                      <p>상태가 최상급인 경우 평균가 대비 5~10% 프리미엄이 붙을 수 있습니다.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  )
}
