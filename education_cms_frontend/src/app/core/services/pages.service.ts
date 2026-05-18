import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { PageDetail, PageSummary } from '@core/models';

interface PageState {
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class PagesService {
  private readonly api = inject(ApiService);

  // Кеш полных страниц по slug
  private readonly cache = signal<Map<string, PageDetail>>(new Map());

  // Глобальные сигналы текущего состояния загрузки/ошибки.
  // (Для разных страниц одновременно — не наш кейс: пользователь смотрит одну.)
  private readonly state = signal<PageState>({ loading: false, error: null });

  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  /**
   * Загружает страницу по slug. Если страница уже в кеше — возвращает её без сети.
   */
  loadPage(slug: string): Observable<PageDetail> {
    const cached = this.cache().get(slug);
    if (cached) {
      this.state.set({ loading: false, error: null });
      return of(cached);
    }

    this.state.set({ loading: true, error: null });

    return this.api.get<PageDetail>(`/pages/${slug}/`).pipe(
      tap((page) => {
        this.cache.update((m) => new Map(m).set(slug, page));
        this.state.set({ loading: false, error: null });
      }),
      catchError((err) => {
        const message =
          err?.status === 404 ? 'Страница не найдена' : 'Не удалось загрузить страницу';
        this.state.set({ loading: false, error: message });
        return throwError(() => err);
      }),
    );
  }

  /** Список всех опубликованных страниц (для будущей карты сайта/поиска, не используется в Этапе 2) */
  listPages(): Observable<PageSummary[]> {
    return this.api.get<PageSummary[]>('/pages/');
  }

  /** Сбросить кеш — пригодится для dev-режима */
  invalidate(slug?: string): void {
    if (slug) {
      this.cache.update((m) => {
        const next = new Map(m);
        next.delete(slug);
        return next;
      });
    } else {
      this.cache.set(new Map());
    }
  }
}
