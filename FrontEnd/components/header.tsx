"use client"

import Link from "next/link"
import { Search, Menu, User, Heart, MessageCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUsername(localStorage.getItem("username") || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    toast.info("로그아웃 되었습니다.");
    router.push("/");
  };

  const navLinks = [
    { href: "/community", text: "커뮤니티" },
    { href: "/price-check", text: "시세조회" },
    { href: "/chat", text: "채팅" },
    { href: "/sharing", text: "나눔" },
    { href: "/barter", text: "물물교환" },
  ]

  const categoryLinks = [
      { href: "/electronics", text: "전자제품" },
      { href: "/fashion", text: "패션/의류" },
      { href: "/home", text: "생활/가전" },
      { href: "/books", text: "도서/음반" },
      { href: "/sports", text: "스포츠/레저" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 상단 유틸리티 바 */}
      <div className="border-b border-border/40">
        <div className="container mx-auto flex h-10 items-center justify-between px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>안전거래를 위한 대파의 약속</span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="font-bold">{username}님</span>
                <Link href="/mypage" className="hover:text-primary transition-colors">
                  마이페이지
                </Link>
                <button onClick={handleLogout} className="hover:text-primary transition-colors">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary transition-colors">
                  로그인
                </Link>
                <Link href="/signup" className="hover:text-primary transition-colors">
                  회원가입
                </Link>
              </>
            )}
            <Link href="/help" className="hover:text-primary transition-colors">
              고객센터
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 daepa-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">대</span>
          </div>
          <span className="text-2xl font-bold text-primary">대파</span>
        </Link>

        {/* 검색바 (데스크탑) */}
        <div className="hidden flex-1 max-w-2xl mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="어떤 상품을 찾고 계신가요?"
              className="pl-10 pr-4 py-3 w-full border-2 border-border focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-2">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          <Link href="/mypage">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/trade-matching">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/sell">
            <Button className="hidden md:inline-flex daepa-gradient text-primary-foreground hover:opacity-90 transition-opacity">
              판매하기
            </Button>
          </Link>

          {/* 햄버거 메뉴 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors pl-4"
                  >
                    {link.text}
                  </Link>
                ))}
                <div className="border-t border-border/40 my-4" />
                <h3 className="text-lg font-semibold pl-4">카테고리</h3>
                {categoryLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-base text-muted-foreground hover:text-primary transition-colors pl-4"
                    >
                        {link.text}
                    </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
