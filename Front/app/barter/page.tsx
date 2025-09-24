"use client"

import React, { useMemo, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, Grid, List, MapPin, Search, Wand2, X, Gift, Shuffle } from "lucide-react"
import Link from "next/link"

// -------------------------------
// 1) 데모 데이터(임의)
// -------------------------------
type BarterItem = {
    id: number | string
    ownerName: string
    region: string
    giveTitle: string
    giveImage?: string
    giveCondition: "최상급" | "상급" | "중급" | "하급"
    wantTitle: string
    wantCategory: string
    memo?: string
    likes?: number
    views?: number
    timeAgo?: string
}

const DEMO_BARTERS: BarterItem[] = [
    {
        id: 1,
        ownerName: "친절한 다람쥐",
        region: "서울",
        giveTitle: "닌텐도 스위치 OLED (화이트)",
        giveImage: "/nintendo-switch-oled-white.jpg",
        giveCondition: "상급",
        wantTitle: "아이패드 9세대 이상",
        wantCategory: "전자제품",
        memo: "추가금 협의 가능해요.",
        likes: 23,
        views: 330,
        timeAgo: "3시간 전",
    },
    {
        id: 2,
        ownerName: "열정적인 라이언",
        region: "경기",
        giveTitle: "에어팟 프로 2세대",
        giveImage: "/airpods-pro-2nd-generation.jpg",
        giveCondition: "최상급",
        wantTitle: "소니 XM5 헤드폰",
        wantCategory: "전자제품",
        memo: "직거래 선호합니다.",
        likes: 12,
        views: 190,
        timeAgo: "어제",
    },
    {
        id: 3,
        ownerName: "행복한 코알라",
        region: "부산",
        giveTitle: "캠핑 의자 2개 세트",
        giveImage: "/placeholder.jpg",
        giveCondition: "중급",
        wantTitle: "폴딩 테이블",
        wantCategory: "스포츠/레저",
        memo: "사용감 있어요.",
        likes: 7,
        views: 72,
        timeAgo: "2일 전",
    },
    {
        id: 4,
        ownerName: "성실한 판다",
        region: "서울",
        giveTitle: "레고 테크닉(완성품)",
        giveImage: "/placeholder.jpg",
        giveCondition: "상급",
        wantTitle: "플스5 컨트롤러 2개",
        wantCategory: "전자제품",
        memo: "박스/매뉴얼 없음",
        likes: 15,
        views: 121,
        timeAgo: "5시간 전",
    },
]

// -------------------------------
// 2) 간단 유틸
// -------------------------------
const CATEGORIES = ["전체", "전자제품", "패션/의류", "생활/가전", "도서/음반", "스포츠/레저", "자동차", "반려동물", "기타"]
const REGIONS = ["전체", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종"]
const CONDITIONS = ["전체", "최상급", "상급", "중급", "하급"]

function getMatchScore(item: BarterItem, myWant: string, myRegion: string, myGive?: string) {
    let score = 0
    const want = myWant.trim().toLowerCase()
    const give = (myGive ?? "").trim().toLowerCase()
    const itemGive = item.giveTitle.toLowerCase()
    const itemWant = item.wantTitle.toLowerCase()

    if (want && (itemGive.includes(want) || itemWant.includes(want))) score += 60
    if (give && (itemWant.includes(give) || itemGive.includes(give))) score += 20
    if (myRegion !== "전체" && item.region === myRegion) score += 20
    return Math.min(100, score)
}

// -------------------------------
// 3) 페이지
// -------------------------------
export default function BarterPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("전체")
    const [region, setRegion] = useState("전체")
    const [condition, setCondition] = useState("전체")

    const [myWant, setMyWant] = useState("아이패드")
    const [myGive, setMyGive] = useState("닌텐도")
    const [myRegion, setMyRegion] = useState("서울")

    const [openOffer, setOpenOffer] = useState<BarterItem | null>(null)
    const [offerMemo, setOfferMemo] = useState("안녕하세요! 교환 제안드립니다. 일정/장소는 협의 가능해요.")

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim()
        return DEMO_BARTERS.filter((item) => {
            const searchHit =
                q === "" ||
                item.giveTitle.toLowerCase().includes(q) ||
                item.wantTitle.toLowerCase().includes(q) ||
                item.ownerName.toLowerCase().includes(q)

            const catHit = category === "전체" || item.wantCategory === category
            const regHit = region === "전체" || item.region === region
            const conHit = condition === "전체" || item.giveCondition === (condition as BarterItem["giveCondition"])

            return searchHit && catHit && regHit && conHit
        })
            .map((item) => ({ ...item, __score: getMatchScore(item, myWant, myRegion, myGive) }))
            .sort((a, b) => (b as any).__score - (a as any).__score)
    }, [query, category, region, condition, myWant, myRegion, myGive])

    const resetFilters = () => {
        setQuery("")
        setCategory("전체")
        setRegion("전체")
        setCondition("전체")
    }

    const OfferModal = openOffer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-background border shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Shuffle className="w-4 h-4" />
                        <h3 className="font-semibold">교환 제안 보내기</h3>
                    </div>
                    <button onClick={() => setOpenOffer(null)} aria-label="닫기">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="text-sm text-muted-foreground">
                        <div className="mb-2">상대 물건: <span className="text-foreground font-medium">{openOffer.giveTitle}</span></div>
                        <div>상대 희망: <span className="text-foreground font-medium">{openOffer.wantTitle}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">내가 내놓을 물건</div>
                            <Input
                                placeholder="예) 닌텐도 스위치 OLED"
                                value={myGive}
                                onChange={(e) => setMyGive(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">내가 원하는 물건</div>
                            <Input
                                placeholder="예) 아이패드 9세대 이상"
                                value={myWant}
                                onChange={(e) => setMyWant(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground mb-1">메시지</div>
                        <textarea
                            className="w-full min-h-[100px] rounded-md border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            value={offerMemo}
                            onChange={(e) => setOfferMemo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 border-t flex items-center justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpenOffer(null)}>취소</Button>
                    <Button
                        onClick={() => {
                            alert("교환 제안을 보냈습니다! (데모)")
                            setOpenOffer(null)
                        }}
                    >
                        보내기
                    </Button>
                </div>
            </div>
        </div>
    ) : null

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                {/* 타이틀 */}
                <div className="mb-6">
                    <div className="flex items-center gap-2">
                        <ArrowLeftRight className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-bold">물물교환</h1>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        서로 원하는 물건을 찾아 <strong>현금 없이 교환</strong>해보세요. 매칭 점수로 빠르게 상대를 고를 수 있어요.
                    </p>
                </div>

                {/* 매칭 가이드(내 희망) */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            <div className="md:col-span-2">
                                <div className="text-xs text-muted-foreground mb-1">내가 원하는 것</div>
                                <div className="flex gap-2">
                                    <Input value={myWant} onChange={(e) => setMyWant(e.target.value)} placeholder="예) 아이패드" />
                                    <Button variant="outline" className="whitespace-nowrap">
                                        <Wand2 className="w-4 h-4 mr-1" />
                                        매칭 강화
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground mb-1">내가 내놓을 것</div>
                                <Input value={myGive} onChange={(e) => setMyGive(e.target.value)} placeholder="예) 닌텐도" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground mb-1">내 지역</div>
                                <Select value={myRegion} onValueChange={setMyRegion}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button asChild className="w-full">
                                    <Link href="/trade-matching"><Gift className="w-4 h-4 mr-2" />교환 매칭 추천</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 검색/필터 & 뷰 전환 */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                    <div className="flex-1 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-9"
                                placeholder="내놓을 것/원하는 것/닉네임으로 검색"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-40"><SelectValue placeholder="카테고리" /></SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Select value={region} onValueChange={setRegion}>
                            <SelectTrigger className="w-28"><SelectValue placeholder="지역" /></SelectTrigger>
                            <SelectContent>
                                {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Select value={condition} onValueChange={setCondition}>
                            <SelectTrigger className="w-28"><SelectValue placeholder="상태" /></SelectTrigger>
                            <SelectContent>
                                {CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Button variant="outline" onClick={resetFilters}>초기화</Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("grid")}
                            aria-label="그리드 보기"
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("list")}
                            aria-label="리스트 보기"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* 결과 */}
                {filtered.length === 0 ? (
                    <Card>
                        <CardContent className="p-10 text-center text-muted-foreground">
                            조건에 맞는 교환 글이 없습니다.
                        </CardContent>
                    </Card>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((item) => (
                            <Card key={item.id} className="group overflow-hidden hover:shadow-md transition-all">
                                <div className="relative">
                                    <img
                                        src={item.giveImage ?? "/images/placeholder-product.svg"}
                                        alt={item.giveTitle}
                                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="secondary" className="bg-white/90 text-primary flex items-center gap-1">
                                            <Shuffle className="w-3 h-3" />
                                            매칭 {(item as any).__score}%
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <MapPin className="w-3 h-3" />
                                        <span>{item.region}</span>
                                        <span>·</span>
                                        <span>{item.timeAgo ?? ""}</span>
                                    </div>

                                    <h3 className="font-semibold line-clamp-2">{item.giveTitle}</h3>

                                    <div className="flex items-center gap-2">
                                        <Badge variant={item.giveCondition === "최상급" ? "default" : "secondary"}>
                                            {item.giveCondition}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">소유자: {item.ownerName}</span>
                                    </div>

                                    <div className="text-sm">
                                        <span className="text-muted-foreground">원하는 것: </span>
                                        <span className="font-medium">{item.wantTitle}</span>
                                        <Badge variant="outline" className="ml-2">{item.wantCategory}</Badge>
                                    </div>

                                    {item.memo && <p className="text-sm text-muted-foreground line-clamp-2">{item.memo}</p>}

                                    <div className="flex items-center justify-between pt-1">
                                        <Button className="w-full" onClick={() => setOpenOffer(item)}>
                                            교환 제안하기
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-all">
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <div className="w-36 h-28 rounded-md overflow-hidden">
                                            <img
                                                src={item.giveImage ?? "/images/placeholder-product.svg"}
                                                alt={item.giveTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{item.region}</span>
                                                    <span>·</span>
                                                    <span>{item.timeAgo ?? ""}</span>
                                                </div>
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <Shuffle className="w-3 h-3" />
                                                    매칭 {(item as any).__score}%
                                                </Badge>
                                            </div>

                                            <h3 className="font-semibold mt-1">{item.giveTitle}</h3>

                                            <div className="mt-1 text-sm">
                                                <Badge variant={item.giveCondition === "최상급" ? "default" : "secondary"} className="mr-2">
                                                    {item.giveCondition}
                                                </Badge>
                                                <span className="text-muted-foreground">소유자: </span>
                                                <span className="font-medium">{item.ownerName}</span>
                                            </div>

                                            <div className="mt-2 text-sm">
                                                <span className="text-muted-foreground">원하는 것: </span>
                                                <span className="font-medium">{item.wantTitle}</span>
                                                <Badge variant="outline" className="ml-2">{item.wantCategory}</Badge>
                                            </div>

                                            {item.memo && (
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {item.memo}
                                                </p>
                                            )}

                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="text-xs text-muted-foreground">
                                                    ❤ {item.likes ?? 0} · 👁 {item.views ?? 0}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" asChild>
                                                        <Link href={`/product/${item.id}`}>상세 보기</Link>
                                                    </Button>
                                                    <Button onClick={() => setOpenOffer(item)}>교환 제안하기</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            {OfferModal}
        </div>
    )
}
