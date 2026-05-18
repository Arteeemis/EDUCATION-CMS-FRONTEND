export interface PostPreview {
  id: number;
  title: string;
  image: string | null;
  tags: string;
  is_urgent: boolean;
  author: string | null;
  published_at: string;
}

export interface Post extends PostPreview {
  news_feed: number;
  content: string;
  created_at: string;
  updated_at: string;
}
