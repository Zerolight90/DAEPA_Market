import type React from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  location: string;
  timeAgo: string;
  images: string[];
  likes: number;
  chats: number;
  views: number;
  category: string;
  condition: string;
  isNegotiable: boolean;
  description?: string;
  seller?: Seller;
  shipping?: Shipping;
  safety?: Safety;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  responseRate: number;
  responseTime: string;
  joinDate: string;
  verifiedPhone: boolean;
  verifiedEmail: boolean;
}

export interface Shipping {
  freeShipping: boolean;
  shippingCost: number;
  estimatedDays: string;
}

export interface Safety {
  safePayment: boolean;
  returnPolicy: boolean;
  warranty: boolean;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    posts: number;
  };
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  timeAgo: string;
  isPinned: boolean;
  isHot: boolean;
}

export interface CommunityCategory {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

export interface HotTopic {
  tag: string;
  count: number;
}

export interface ChatRoom {
  id: number;
  participant: {
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: string;
  };
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    sender: 'me' | 'other';
  };
  unreadCount: number;
  isActive: boolean;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: 'me' | 'other';
  isRead: boolean;
  type?: 'image' | 'text';
}
