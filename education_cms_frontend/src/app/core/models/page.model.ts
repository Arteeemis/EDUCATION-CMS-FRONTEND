import { Block } from './block.model';

export type PageStatus = 'draft' | 'published';

export interface PageSummary {
  id: number;
  title: string;
  slug: string;
  status: PageStatus;
  updated_at: string;
}

export interface PageDetail extends PageSummary {
  blocks: PageBlockPlacement[];
}

export interface PageBlockPlacement {
  position: number;
  is_visible: boolean;
  block: Block;
}
