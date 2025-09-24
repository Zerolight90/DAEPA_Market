"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Tag, DollarSign, Search, PlusCircle, Trash2, MessageSquare, Edit } from "lucide-react";

// UI 데모를 위한 임시 데이터
const initialMatchRequests = [
    { id: 1, keyword: "아이폰 15 Pro", category: "디지털기기", maxPrice: 1200000, condition: "새상품", isActive: true },
    { id: 2, keyword: "캠핑 의자", category: "스포츠/레저", maxPrice: 50000, condition: "사용감 적음", isActive: true },
    { id: 3, keyword: "LP", category: "도서/음반", maxPrice: 100000, condition: "상관없음", isActive: false },
];

const initialMatchedItems = [
    {
        id: 101,
        title: "아이폰 15 Pro 256GB 미개봉 새상품 판매합니다",
        price: 1180000,
        image: "/iphone-14-pro-purple.jpg",
        seller: "빠른거래원해요",
        matchedRequest: "아이폰 15 Pro"
    },
    {
        id: 102,
        title: "상태 좋은 헬리녹스 캠핑 의자 팝니다",
        price: 45000,
        image: "/placeholder.jpg",
        seller: "캠핑매니아",
        matchedRequest: "캠핑 의자"
    },
];

export default function MatchingPage() {
    const [matchRequests, setMatchRequests] = useState(initialMatchRequests);
    const [matchedItems, setMatchedItems] = useState(initialMatchedItems);

    return (
        <div className="min-h-screen bg-muted/40">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                        <Bell className="w-8 h-8 text-primary" />
                        거래 매칭
                    </h1>
                    <p className="text-muted-foreground">원하는 상품이 등록되면 가장 먼저 알림을 받아보세요!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 왼쪽: 알림 등록 폼 */}
                    <aside className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PlusCircle className="w-5 h-5" />
                                    새 알림 등록
                                </CardTitle>
                                <CardDescription>
                                    찾고 있는 상품의 조건을 입력해주세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="keyword">상품명/키워드</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="keyword" placeholder="예: 아이폰 15 Pro" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">카테고리</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="카테고리를 선택하세요" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="electronics">디지털기기</SelectItem>
                                            <SelectItem value="fashion">패션/의류</SelectItem>
                                            <SelectItem value="home">생활/가전</SelectItem>
                                            <SelectItem value="books">도서/음반</SelectItem>
                                            <SelectItem value="sports">스포츠/레저</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxPrice">최대 가격</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="maxPrice" type="number" placeholder="희망하는 최고 가격" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>상품 상태 (중복 가능)</Label>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2"><Checkbox id="new" /><Label htmlFor="new">미개봉 새상품</Label></div>
                                        <div className="flex items-center space-x-2"><Checkbox id="good" /><Label htmlFor="good">사용감 적음</Label></div>
                                    </div>
                                </div>
                                <Button className="w-full daepa-gradient text-white">
                                    <Bell className="w-4 h-4 mr-2" />
                                    알림 등록하기
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* 오른쪽: 매칭 현황 */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="matched-items">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="matched-items">
                                    새로 매칭된 상품 ({matchedItems.length})
                                </TabsTrigger>
                                <TabsTrigger value="my-requests">
                                    내 알림 목록 ({matchRequests.length})
                                </TabsTrigger>
                            </TabsList>

                            {/* 새로 매칭된 상품 탭 */}
                            <TabsContent value="matched-items" className="mt-4 space-y-4">
                                {matchedItems.map(item => (
                                    <Card key={item.id} className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                                        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground">{item.seller}님의 상품</p>
                                            <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                                            <p className="font-bold text-lg text-primary my-1">{item.price.toLocaleString()}원</p>
                                            <Badge variant="secondary">
                                                <Tag className="w-3 h-3 mr-1" />
                                                '{item.matchedRequest}' 알림과 매칭됨
                                            </Badge>
                                        </div>
                                        <Button>
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            채팅하기
                                        </Button>
                                    </Card>
                                ))}
                            </TabsContent>

                            {/* 내 알림 목록 탭 */}
                            <TabsContent value="my-requests" className="mt-4 space-y-4">
                                {matchRequests.map(req => (
                                    <Card key={req.id} className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">{req.keyword}</h3>
                                                <div className="text-sm text-muted-foreground mt-1 space-x-2">
                                                    <span>{req.category}</span>
                                                    <span>|</span>
                                                    <span>최대 {req.maxPrice.toLocaleString()}원</span>
                                                    <span>|</span>
                                                    <span>{req.condition}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id={`active-${req.id}`} checked={req.isActive} />
                                                <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}