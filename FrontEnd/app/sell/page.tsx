'use client';

import { useState } from 'react';
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

// 이 부분이 변경되었습니다.
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function SellPage() {
    const [images, setImages] = useState<string[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...filesArray].slice(0, 12));
        }
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-muted/40 py-8 md:py-12">
                <div className="container mx-auto">
                    <Card className="max-w-3xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl">어떤 상품을 판매하시나요?</CardTitle>
                            <CardDescription>
                                상품 정보를 정확하게 입력할수록 판매될 확률이 높아져요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-base font-semibold">상품명</Label>
                                    <Input id="title" placeholder="예) 아이폰 14 Pro 128GB" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="images" className="text-base font-semibold">상품 이미지 (최대 12개)</Label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group aspect-square">
                                                <img src={image} alt={`upload-preview-${index}`} className="w-full h-full object-cover rounded-md" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {images.length < 12 && (
                                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-md cursor-pointer hover:bg-accent">
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground mt-1">이미지 추가</span>
                                                <Input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description" className="text-base font-semibold">상세 설명</Label>
                                    <Textarea id="description" placeholder="상품의 상태, 구매 시기, 사용 기간 등을 자세하게 적어주세요." rows={8} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="category" className="text-base font-semibold">카테고리</Label>
                                        <Select>
                                            <SelectTrigger><SelectValue placeholder="카테고리를 선택하세요" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="electronics">전자제품</SelectItem>
                                                <SelectItem value="fashion">패션/의류</SelectItem>
                                                <SelectItem value="home">생활/가전</SelectItem>
                                                <SelectItem value="books">도서/음반</SelectItem>
                                                <SelectItem value="sports">스포츠/레저</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price" className="text-base font-semibold">가격</Label>
                                        <div className="relative">
                                            <Input id="price" type="number" placeholder="판매 가격을 입력하세요" className="pr-8" />
                                            <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">원</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-base font-semibold">상품 상태</Label>
                                    <RadioGroup defaultValue="used-good" className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="new" id="new" />
                                            <Label htmlFor="new">미개봉 새상품</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="used-best" id="used-best" />
                                            <Label htmlFor="used-best">사용감 거의 없음</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="used-good" id="used-good" />
                                            <Label htmlFor="used-good">사용감 있음</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="used-normal" id="used-normal" />
                                            <Label htmlFor="used-normal">사용감 많음</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-base font-semibold">거래 방식 (중복 가능)</Label>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="trade-in-person" />
                                            <Label htmlFor="trade-in-person">직거래</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="trade-delivery" />
                                            <Label htmlFor="trade-delivery">택배거래</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <Button variant="outline" size="lg">취소</Button>
                                    <Button type="submit" size="lg" className="daepa-gradient text-white">상품 등록하기</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}