import { PostPreview } from './post.model';

export type BlockType =
  | 'html'
  | 'faq'
  | 'news_feed'
  | 'header_links'
  | 'footer_contacts'
  | 'google_doc'
  | 'google_sheet'
  | 'vk_video'
  | 'links';

export interface BlockBase {
  id: number;
  type: BlockType;
  admin_label: string;
  created_at: string;
  updated_at: string;
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

export interface GoogleDocBlock extends BlockBase {
  type: 'google_doc';
  doc_url: string;
}

export interface ExcelEmbedBlock extends BlockBase {
  type: 'google_sheet';
  table_url: string;
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

export interface VkVideoBlock extends BlockBase {
  type: 'vk_video';
  video_url: string;
}

export interface LinksBlockLink {
  url?: string | null;
  description?: string | null;
}

export interface LinksBlock extends BlockBase {
  type: 'links';
  title: string;
  description?: string | null;
  link1?: string | null;
  link1_desc?: string | null;
  link2?: string | null;
  link2_desc?: string | null;
  link3?: string | null;
  link3_desc?: string | null;
  link4?: string | null;
  link4_desc?: string | null;
  link5?: string | null;
  link5_desc?: string | null;
  link6?: string | null;
  link6_desc?: string | null;
}

export type Block =
  | HtmlBlock
  | FaqBlock
  | NewsFeedBlock
  | HeaderLinksBlock
  | FooterContactsBlock
  | GoogleDocBlock
  | ExcelEmbedBlock
  | VkVideoBlock
  | LinksBlock;
