import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PaginatedResponse, Post } from '@core/models';

export interface NewsListParams {
  newsFeed?: number;
  isUrgent?: boolean;
  page?: number;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly api = inject(ApiService);

  list(params: NewsListParams = {}): Observable<PaginatedResponse<Post>> {
    const query: Record<string, string | number | boolean> = {};
    if (params.newsFeed != null) query['news_feed'] = params.newsFeed;
    if (params.isUrgent != null) query['is_urgent'] = params.isUrgent;
    if (params.page != null && params.page > 1) query['page'] = params.page;
    return this.api.get<PaginatedResponse<Post>>('/news/', query);
  }

  /** Подгрузка по абсолютному URL (поле `next` / `previous` из пагинации) */
  listByUrl(url: string): Observable<PaginatedResponse<Post>> {
    return this.api.getAbsolute<PaginatedResponse<Post>>(url);
  }

  getOne(id: number): Observable<Post> {
    return this.api.get<Post>(`/news/${id}/`);
  }
}
