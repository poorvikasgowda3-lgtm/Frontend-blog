/**
 * Shared types for the Meet5 application
 */

export interface Article {
  article_id: number;
  author_id: number;
  title: string;
  summary?: string | null;
  content?: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at?: string;
}

export interface User {
  user_id: number | string;
  username: string;
  display_name: string;
  email?: string | null;
  avatar_url?: string | null;
  _id?: string;
  name?: string;
}

export interface Interaction {
  interaction_id: number;
  article_id: number;
  user_id: number;
  type: 'view' | 'like' | 'share' | 'comment';
  duration_seconds: number;
  device_type?: string | null;
  created_at: string;
}

export interface FeedResponse {
  feed: Article[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}
