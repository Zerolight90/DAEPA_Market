'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ChevronRight, User as UserIcon, List, Heart, Power, Settings, MapPin, CreditCard, Star } from "lucide-react";

const MyPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 로그인 정보 확인
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (loggedIn !== 'true' || !storedUsername) {
      toast.error('로그인이 필요합니다.');
      router.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  const handleLogout = () => {
    // 모든 로그인 관련 localStorage 데이터 삭제
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('gender');
    localStorage.removeItem('phoneNumber');

    toast.info('로그아웃 되었습니다.');
    router.push('/');
  };

  // UI 표시를 위한 임시 데이터
  const trustScore = 750;

  // 사용자 이름이 로드되기 전에는 로딩 상태나 null을 렌더링
  if (!username) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <p>로그인 정보를 확인하는 중...</p>
        </div>
    );
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-50/50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* 왼쪽 사이드바 */}
            <aside className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="text-xl font-bold mb-5">마이페이지</h2>
                <nav className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-md">거래 정보</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li><Link href="#" className="hover:text-primary transition-colors">판매내역</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">구매내역</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">찜한 상품</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">안심결제 정산내역</Link></li>
                  </ul>
                </nav>
              </div>
              <div className="border-t pt-8">
                <nav className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-md">내 정보</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li><Link href="#" className="hover:text-primary transition-colors">계좌 관리</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">배송지 관리</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">거래 후기</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">탈퇴하기</Link></li>
                  </ul>
                </nav>
              </div>

            </aside>

            {/* 오른쪽 메인 콘텐츠 */}
            <div className="lg:col-span-3 space-y-10">

              {/* 사용자 프로필 섹션 */}
              <div className="flex items-center gap-6 p-6 border rounded-xl bg-white shadow-sm">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={`https://avatar.vercel.sh/${username}.png`} alt="User Avatar" />
                  <AvatarFallback className="text-3xl">{username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1 mt-2">
                      <span className="text-gray-600">신뢰지수</span>
                      <span className="font-semibold text-primary">{trustScore}</span>
                    </div>
                    <Progress value={(trustScore / 1000) * 100} className="w-full h-2" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">가게 소개를 작성하고 신뢰도를 높여 보세요.</p>
                </div>
              </div>

              {/* 통계 및 배너 섹션 */}
              <div>
                <Link href="#" className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg mb-4 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <h3 className="font-semibold text-green-800">카카오 상품 자동 등록하기</h3>
                      <p className="text-sm text-green-700">연결을 진행해 주세요.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-green-700" />
                </Link>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border rounded-lg bg-white p-4">
                  <div className="p-2">
                    <p className="text-gray-500 text-sm mb-1">안심결제</p>
                    <p className="font-bold text-lg">0</p>
                  </div>
                  <div className="p-2">
                    <p className="text-gray-500 text-sm mb-1">거래후기</p>
                    <p className="font-bold text-lg">0</p>
                  </div>
                  <div className="p-2">
                    <p className="text-gray-500 text-sm mb-1">단골</p>
                    <p className="font-bold text-lg">0</p>
                  </div>
                  <div className="p-2 flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 text-sm">에어크레딧</p>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <p className="font-bold text-lg ml-2">0 M</p>
                  </div>
                </div>
              </div>

              {/* 내 상품 섹션 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">내 상품</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="hover:text-primary font-semibold text-primary">최신순</button>
                    <span className="text-gray-300">|</span>
                    <button className="hover:text-primary">낮은가격순</button>
                    <span className="text-gray-300">|</span>
                    <button className="hover:text-primary">높은가격순</button>
                  </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="selling">판매중</TabsTrigger>
                    <TabsTrigger value="reserved">예약중</TabsTrigger>
                    <TabsTrigger value="sold">판매완료</TabsTrigger>
                  </TabsList>
                  <div className="border rounded-b-md bg-white">
                    <TabsContent value="all" className="mt-0">
                      <div className="text-center py-24">
                        <p className="text-gray-500">선택된 조건에 해당하는 상품이 없습니다.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="selling" className="mt-0">
                      <div className="text-center py-24">
                        <p className="text-gray-500">판매중인 상품이 없습니다.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="reserved" className="mt-0">
                      <div className="text-center py-24">
                        <p className="text-gray-500">예약중인 상품이 없습니다.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="sold" className="mt-0">
                      <div className="text-center py-24">
                        <p className="text-gray-500">판매완료된 상품이 없습니다.</p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default MyPage;