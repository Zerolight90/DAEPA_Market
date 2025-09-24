'use client';

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { allProducts } from "@/lib/data";

// 타입을 명시하여 코드 안정성 향상
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
}

const generatePriceData = (products: Product[]) => {
  const items: { [key: string]: Product[] } = {};
  products.forEach(product => {
    const normalizedTitle = product.title.split(' ').slice(0, 3).join(' ');
    if (!items[normalizedTitle]) {
      items[normalizedTitle] = [];
    }
    items[normalizedTitle].push(product);
  });

  return Object.entries(items).map(([name, productGroup]) => {
    const avgPrice = productGroup.reduce((acc, p) => acc + p.price, 0) / productGroup.length;
    const prices = productGroup.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const change = Math.round(avgPrice) - Math.round(avgPrice * 1.05);

    return {
      id: productGroup[0].id,
      name: name,
      category: productGroup[0].category,
      currentPrice: Math.round(avgPrice),
      change: change,
      trend: change > 0 ? 'up' : 'down',
      volume: productGroup.length,
      image: productGroup[0].images[0],
      priceHistory: [
        { date: "8월", price: Math.round(avgPrice * 1.05) },
        { date: "9월", price: Math.round(avgPrice) },
      ],
      conditions: {
        '최상급': Math.round(maxPrice),
        '상급': Math.round(avgPrice),
        '중급': Math.round(minPrice),
      },
    };
  });
};

const categories = ["전체", ...new Set(allProducts.map(p => p.category))];
const trendingItems = [
  { name: "아이폰 15 Pro", change: 5.2, trend: "up" },
  { name: "갤럭시 S24", change: -2.1, trend: "down" },
  { name: "맥북 프로 M3", change: 3.8, trend: "up" },
];

export default function PriceCheckPage() {
  const [searchQuery, setSearchQuery] = useState("아이폰");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState<any>(null); // 타입 추론을 위해 any로 설정, 실제 타입으로 변경 가능
  const [timeRange, setTimeRange] = useState("9개월");

  const priceData = useMemo(() => generatePriceData(allProducts), []);

  const filteredData = useMemo(() => {
    return priceData.filter((item) => {
      const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
      const matchesSearch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, priceData]);

  // ✨ 여기가 수정된 부분입니다.
  // 필터링된 데이터가 변경될 때만 이 효과를 실행하여 무한 루프를 방지합니다.
  useEffect(() => {
    // 현재 선택된 아이템이 더 이상 필터링된 목록에 없는 경우,
    // 목록의 첫 번째 아이템을 기본값으로 선택하거나 선택을 해제(null)합니다.
    const isSelectedItemValid = selectedItem && filteredData.some(i => i.id === selectedItem.id);

    if (!isSelectedItemValid) {
      setSelectedItem(filteredData.length > 0 ? filteredData[0] : null);
    }
  }, [filteredData]); // 의존성 배열에서 selectedItem을 제거하여 안정성 확보


  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">시세조회</h1>
            <p className="text-muted-foreground">실시간 중고거래 시세를 확인하고 합리적인 가격으로 거래하세요</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader><h3 className="font-semibold">상품 검색</h3></CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="상품명 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><h3 className="font-semibold">카테고리</h3></CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                        <button key={category} onClick={() => setSelectedCategory(category)} className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${selectedCategory === category ? "bg-accent text-accent-foreground" : ""}`}>
                          {category}
                        </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4" />급상승 아이템</h3></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <div className={`flex items-center gap-1 text-sm ${getTrendColor(item.trend)}`}>
                            {getTrendIcon(item.trend)}
                            <span>{Math.abs(item.change)}%</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">시세 목록</h3>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4 mr-2" />새로고침</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredData.length > 0 ? (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {filteredData.map((item) => (
                            <div key={item.id} onClick={() => setSelectedItem(item)} className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${selectedItem?.id === item.id ? "border-primary bg-accent" : "border-border"}`}>
                              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold mb-1 truncate">{item.name}</h4>
                                <Badge variant="outline" className="text-xs mb-2">{item.category}</Badge>
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                                  <span className="text-xl font-bold text-primary">{item.currentPrice.toLocaleString()}원</span>
                                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(item.trend)}`}>
                                    {getTrendIcon(item.trend)}
                                    <span>{item.change > 0 ? "+" : ""}{item.change.toLocaleString()}원</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right text-sm text-muted-foreground">
                                <div>거래량</div>
                                <div className="font-medium">{item.volume}건</div>
                              </div>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <div className="text-center py-20">
                        <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                      </div>
                  )}
                </CardContent>
              </Card>

              {selectedItem && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{selectedItem.name} 상세 시세</h3>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1개월">1개월</SelectItem>
                            <SelectItem value="3개월">3개월</SelectItem>
                            <SelectItem value="6개월">6개월</SelectItem>
                            <SelectItem value="9개월">9개월</SelectItem>
                            <SelectItem value="1년">1년</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="chart" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="chart">가격 추이</TabsTrigger>
                          <TabsTrigger value="condition">상태별 시세</TabsTrigger>
                          <TabsTrigger value="analysis">시장 분석</TabsTrigger>
                        </TabsList>
                        <TabsContent value="chart" className="pt-4">
                          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={selectedItem.priceHistory}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis tickFormatter={(value) => `${(value / 10000).toFixed(0)}만원`} /><Tooltip formatter={(value: number) => [`${value.toLocaleString()}원`, "시세"]} /><Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }} /></LineChart></ResponsiveContainer></div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div className="text-center p-4 bg-secondary/30 rounded-lg"><div className="text-2xl font-bold text-primary">{selectedItem.currentPrice.toLocaleString()}원</div><div className="text-sm text-muted-foreground">현재 시세</div></div>
                            <div className="text-center p-4 bg-secondary/30 rounded-lg"><div className={`text-2xl font-bold ${getTrendColor(selectedItem.trend)}`}>{selectedItem.change > 0 ? "+" : ""}{selectedItem.change.toLocaleString()}원</div><div className="text-sm text-muted-foreground">전월 대비</div></div>
                            <div className="text-center p-4 bg-secondary/30 rounded-lg"><div className="text-2xl font-bold">{Math.max(...selectedItem.priceHistory.map((p: any) => p.price)).toLocaleString()}원</div><div className="text-sm text-muted-foreground">최고가</div></div>
                            <div className="text-center p-4 bg-secondary/30 rounded-lg"><div className="text-2xl font-bold">{Math.min(...selectedItem.priceHistory.map((p: any) => p.price)).toLocaleString()}원</div><div className="text-sm text-muted-foreground">최저가</div></div>
                          </div>
                        </TabsContent>
                        <TabsContent value="condition" className="pt-4">
                          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={Object.entries(selectedItem.conditions).map(([condition, price]) => ({ condition, price }))}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="condition" /><YAxis tickFormatter={(value) => `${(value / 10000).toFixed(0)}만원`} /><Tooltip formatter={(value: number) => [`${value.toLocaleString()}원`, "시세"]} /><Bar dataKey="price" fill="#22c55e" /></BarChart></ResponsiveContainer></div>
                        </TabsContent>
                        <TabsContent value="analysis" className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card><CardHeader><h4 className="font-semibold">시장 동향</h4></CardHeader><CardContent className="space-y-3"><div className="flex justify-between"><span>거래량 (월간)</span><span className="font-medium">{selectedItem.volume}건</span></div><div className="flex justify-between"><span>평균 판매기간</span><span className="font-medium">3.2일</span></div><div className="flex justify-between"><span>가격 변동성</span><span className="font-medium">중간</span></div><div className="flex justify-between"><span>시장 활성도</span><span className="font-medium">높음</span></div></CardContent></Card>
                            <Card><CardHeader><h4 className="font-semibold">거래 팁</h4></CardHeader><CardContent className="space-y-3 text-sm"><div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg"><p className="text-green-800 dark:text-green-200"><strong>판매 시:</strong> 현재 시세가 상승 추세이므로 조금 더 기다려보는 것을 추천합니다.</p></div><div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"><p className="text-blue-800 dark:text-blue-200"><strong>구매 시:</strong> 상태가 좋은 제품이 많이 나오는 시기입니다. 꼼꼼히 비교해보세요.</p></div></CardContent></Card>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
  )
}