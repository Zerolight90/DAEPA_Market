"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Eye,
  Clock,
  Search,
  TrendingUp,
  Users,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Star,
  Pin,
} from "lucide-react"
import Link from "next/link"
import { communityPosts, communityCategories, hotTopics } from "@/lib/data"

// Map icon names from data to actual components
const iconMap: { [key: string]: React.ElementType } = {
  Users,
  Star,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  MessageCircle,
}

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")

  const filteredPosts = communityPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase() === communityCategories.find((c) => c.id === selectedCategory)?.name.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "comments":
        return b.comments - a.comments
      case "views":
        return b.views - a.views
      default: // latest
        return a.id - b.id; // Simple sort by id for stable order
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">커뮤니티</h1>
          <p className="text-muted-foreground">대파 사용자들과 정보를 공유하고 소통해보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <Button className="w-full daepa-gradient text-white hover:opacity-90" size="lg">
              글쓰기
            </Button>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">카테고리</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {communityCategories.map((category) => {
                    const Icon = iconMap[category.iconName]
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent transition-colors ${
                          selectedCategory === category.id ? "bg-accent text-accent-foreground" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  인기 토픽
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hotTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(topic.tag)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
                    >
                      #{topic.tag}
                      <span className="text-xs text-muted-foreground">{topic.count}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="게시글 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="comments">댓글순</SelectItem>
                  <SelectItem value="views">조회순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {sortedPosts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                  </CardContent>
                </Card>
              ) : (
                sortedPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                            {post.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                HOT
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {post.author.level}
                            </Badge>
                          </div>

                          <Link href={`/community/post/${post.id}`}>
                            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-1">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-muted-foreground mb-3 line-clamp-2">{post.content}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <button
                                key={index}
                                onClick={() => setSearchQuery(tag)}
                                className="text-xs text-primary hover:underline"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{post.author.name}</span>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.timeAgo}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{post.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  이전
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  다음
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
