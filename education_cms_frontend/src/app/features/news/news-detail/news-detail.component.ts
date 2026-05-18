import { Component, input, inject, signal, effect, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsService } from '@core/services/news.service';
import { LayoutService } from '@core/services/layout.service';
import { Post } from '@core/models';
import { SafeHtmlPipe } from '@core/utils/safe-html.pipe';
import { BadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, SafeHtmlPipe, BadgeComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.less',
})
export class NewsDetailComponent {
  readonly id = input.required<string>();

  private readonly news = inject(NewsService);
  private readonly layout = inject(LayoutService);

  readonly post = signal<Post | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly tags = computed(() => {
    const p = this.post();
    if (!p) return [];
    return p.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  });

  constructor() {
    effect(() => {
      const rawId = this.id();

      // На News-detail header/footer всегда показываются
      this.layout.resetVisibility();

      const numericId = Number(rawId);
      if (!Number.isFinite(numericId) || numericId <= 0) {
        this.error.set('Некорректный идентификатор публикации');
        return;
      }

      this.loading.set(true);
      this.error.set(null);
      this.post.set(null);

      this.news.getOne(numericId).subscribe({
        next: (post) => {
          this.post.set(post);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(
            err?.status === 404 ? 'Публикация не найдена' : 'Не удалось загрузить публикацию',
          );
          this.loading.set(false);
        },
      });
    });
  }
}
