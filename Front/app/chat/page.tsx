"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter 임포트
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Phone, MoreVertical, Image, Paperclip, Smile, Check, CheckCheck, MessageSquare } from "lucide-react";

// 데모용 데이터 직접 임포트
import { chatRooms, messages as allMessages } from "@/lib/data";

export default function ChatPage() {
  const router = useRouter(); // useRouter 훅 초기화
  const [selectedChat, setSelectedChat] = useState(chatRooms[0] || null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      const filteredMessages = allMessages.filter(
          (message) => message.chatRoomId === selectedChat.id
      );
      setCurrentMessages(filteredMessages);
    } else {
      setCurrentMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const messageToSend = {
        id: Date.now(),
        chatRoomId: selectedChat.id,
        sender: "me",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        type: "text",
      };
      setCurrentMessages((prevMessages) => [...prevMessages, messageToSend]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ✨ 상품 상세 페이지로 이동하는 핸들러 추가
  const handleViewProduct = () => {
    if (selectedChat?.product?.id) {
      // 실제 상품 상세 페이지 경로에 맞게 조정하세요.
      // 예: `/products/123`
      router.push(`/products/${selectedChat.product.id}`);
    }
  };

  const filteredChatRooms = chatRooms.filter(
      (room) =>
          room.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">채팅</h1>
            <p className="text-muted-foreground">판매자와 구매자가 안전하게 소통할 수 있는 공간입니다.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* 왼쪽: 채팅방 목록 */}
            <Card className="lg:col-span-1 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between"><h3 className="font-semibold">채팅 목록</h3><Badge variant="secondary">{filteredChatRooms.reduce((sum, room) => sum + room.unreadCount, 0)}</Badge></div>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" /><Input placeholder="채팅방 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="space-y-1">
                  {filteredChatRooms.map((room) => (
                      <div key={room.id} onClick={() => setSelectedChat(room)} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-accent ${selectedChat?.id === room.id ? "bg-accent" : ""}`}>
                        <div className="relative"><Avatar className="w-12 h-12"><AvatarImage src={room.participant.avatar} alt={room.participant.name} /><AvatarFallback>{room.participant.name[0]}</AvatarFallback></Avatar>{room.participant.isOnline && (<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1"><h4 className="font-semibold text-sm truncate">{room.participant.name}</h4><span className="text-xs text-muted-foreground">{room.lastMessage.timestamp}</span></div>
                          <p className="text-sm text-muted-foreground truncate mb-1">{room.product.title}</p>
                          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground truncate">{room.lastMessage.content}</p>{room.unreadCount > 0 && (<Badge variant="destructive" className="flex-shrink-0">{room.unreadCount}</Badge>)}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 오른쪽: 선택된 채팅방의 대화 내역 */}
            {selectedChat ? (
                <Card className="lg:col-span-2 flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10"><AvatarImage src={selectedChat.participant.avatar} alt={selectedChat.participant.name} /><AvatarFallback>{selectedChat.participant.name[0]}</AvatarFallback></Avatar>
                        <div><h3 className="font-semibold">{selectedChat.participant.name}</h3><p className="text-sm text-muted-foreground">{selectedChat.participant.isOnline ? "온라인" : selectedChat.participant.lastSeen}</p></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <img src={selectedChat.product.image} alt={selectedChat.product.title} className="w-12 h-12 object-cover rounded-md" />
                      <div className="flex-1"><h4 className="font-medium text-sm line-clamp-1">{selectedChat.product.title}</h4><p className="text-primary font-semibold">{selectedChat.product.price.toLocaleString()}원</p></div>
                      {/* ✨ 상품보기 버튼에 핸들러 추가 */}
                      <Button variant="outline" size="sm" onClick={handleViewProduct}>상품보기</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 min-h-0">
                    {currentMessages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          {message.sender !== 'me' && <Avatar className="w-8 h-8"><AvatarImage src={selectedChat.participant.avatar} /></Avatar>}
                          <div className={`flex flex-col ${message.sender === 'me' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${message.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none'}`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              {message.sender === 'me' && (message.isRead ? <CheckCheck className="w-4 h-4 text-blue-500" /> : <Check className="w-4 h-4" />)}
                              <span>{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </CardContent>
                  <div className="flex-shrink-0 p-4 border-t bg-white">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
                      <Button variant="ghost" size="icon"><Image className="w-5 h-5" /></Button>
                      <div className="flex-1 relative">
                        <Input placeholder="메시지를 입력하세요..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} className="pr-10" />
                        <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"><Smile className="w-5 h-5" /></Button>
                      </div>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="daepa-gradient text-white hover:opacity-90 aspect-square p-2 h-auto"><Send className="w-5 h-5" /></Button>
                    </div>
                  </div>
                </Card>
            ) : (
                <Card className="lg:col-span-2 flex items-center justify-center bg-gray-50/50">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium">채팅을 시작해보세요</h3>
                    <p className="mt-1 text-sm text-gray-500">채팅할 상대를 왼쪽 목록에서 선택해주세요.</p>
                  </div>
                </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
  );
}