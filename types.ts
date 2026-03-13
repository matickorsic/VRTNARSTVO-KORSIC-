import React from 'react';

export interface Plant {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  variation?: string; // e.g. "Mala", "Velika"
  size?: string;      // e.g. "20L", "45L" from CSV import
  color?: string;     // e.g. "Rdeča", "Modra"
  stock?: number;     // Zaloga
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Category {
  id: number;
  name: string;
  category: string;
  image: string;
  video?: string;
  imagePosition?: string;
  description: string;
  galleryImages?: { 
    url: string; 
    additionalUrls?: string[];
    title: string; 
    description?: string;
    details?: {
      plantType?: string;
      family?: string;
      height?: string;
      maxHeight?: string;
      evergreen?: boolean;
      exposure?: string;
      water?: string;
      blooming?: string;
      potSize?: string;
      leafShape?: string;
      leafColor?: string;
      flowerColor?: string;
      use?: string;
      minTemp?: string;
      soil?: string;
      pruning?: string;
      trunk?: string;
      diameter?: string;
    }
  }[];
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  image?: string; // base64
  isError?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isOpen: boolean;
}