import React from 'react';

export interface Plant {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CategoryGalleryDetails {
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

export interface CategoryGalleryImage {
  url: string;
  additionalUrls?: string[];
  title: string;
  description?: string;
  details?: CategoryGalleryDetails;
}

export interface Category {
  id: number;
  name: string;
  category: string;
  image: string;
  video?: string;
  imagePosition?: string;
  description: string;
  galleryImages?: Array<string | CategoryGalleryImage>;
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
