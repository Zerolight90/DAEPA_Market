"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

// 1단계에서 추가한 찜 목록 데이터를 불러옵니다.
import { wishlistItems } from "@/lib/data";

export default function WishlistPage() {
    const router = useRouter();

    const handleProductClick = (productId: number) => {
        // 상품 ID를 기반으로 상세 페이지로 이동합니다.
        router.push(`/products/${productId}`);
    };

    return (
        <div className="min-h-screen bg-muted/40">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <Heart className="w-8 h-8 text-red-500" />
                        찜한 상품
                    </h1>
                    <p className="text-muted-foreground">
                        총 <span className="font-bold text-primary">{wishlistItems.length}</span>개의 상품을 찜했습니다.
                    </p>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <Card
                                key={item.id}
                                className="overflow-hidden cursor-pointer group"
                                onClick={() => handleProductClick(item.id)}
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-3 right-3 rounded-full w-8 h-8"
                                        // 찜 해제 기능 (UI 데모)
                                        onClick={(e) => { e.stopPropagation(); alert(`${item.title} 찜 해제!`); }}
                                    >
                                        <Heart className="w-4 h-4" fill="white" />
                                    </Button>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-md truncate mb-2">{item.title}</h3>
                                    <p className="text-lg font-bold text-primary mb-2">{item.price.toLocaleString()}원</p>
                                    <p className="text-sm text-muted-foreground mb-4">{item.location}</p>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                                        <p>찜한 날짜: {item.wishlistedAt}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                <span>{item.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>{item.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // 찜한 상품이 없을 때 표시될 화면
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-background rounded-lg">
                        <Heart className="w-16 h-16 text-gray-300 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">찜한 상품이 없습니다.</h2>
                        <p className="text-muted-foreground mb-6">마음에 드는 상품을 발견하면 하트를 눌러보세요!</p>
                        <Button onClick={() => router.push('/')}>홈으로 돌아가기</Button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}