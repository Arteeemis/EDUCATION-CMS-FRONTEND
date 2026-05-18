import { PostPreview } from './post.model';

export type BlockType = 'html' | 'faq' | 'news_feed' | 'header_links' | 'footer_contacts';

export interface BlockBase {
  id: number;
  type: BlockType;
  admin_label: string;
}

export interface HtmlBlock extends BlockBase {
  type: 'html';
  html_content: string;
}

export interface FaqBlock extends BlockBase {
  type: 'faq';
  title: string;
  questions: FaqQuestion[];
}

export interface FaqQuestion {
  id: number;
  question: string;
  answer: string;
  position: number;
}

export interface NewsFeedBlock extends BlockBase {
  type: 'news_feed';
  title: string;
  posts: PostPreview[];
  posts_total: number;
  posts_url: string;
}

export interface HeaderLinksBlock extends BlockBase {
  type: 'header_links';
  links: HeaderLink[];
}

export interface HeaderLink {
  id: number;
  title: string;
  position: number;
  url: string;
  is_visible: boolean;
}

export interface FooterContactsBlock extends BlockBase {
  type: 'footer_contacts';
  address: string;
  phone: string;
  email: string;
  open_date: string | null;
  close_date: string | null;
  open_time: string | null;
  close_time: string | null;
  weekends: string;
  vk_url: string;
  tg_url: string;
  max_url: string;
}

export type Block = HtmlBlock | FaqBlock | NewsFeedBlock | HeaderLinksBlock | FooterContactsBlock;
