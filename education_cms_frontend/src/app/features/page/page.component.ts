import { Component, input, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '@core/services/pages.service';
import { LayoutService } from '@core/services/layout.service';
import { PageDetail, PageBlockPlacement } from '@core/models';
import { HtmlBlockComponent } from './blocks/html-block/html-block.component';
import { FaqBlockComponent } from './blocks/faq-block/faq-block.component';
import { NewsFeedBlockComponent } from './blocks/news-feed-block/news-feed-block.component';
import { HeaderLinksBlockComponent } from './blocks/header-links-block/header-links-block.component';
import { FooterContactsBlockComponent } from './blocks/footer-contacts-block/footer-contacts-block.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    HtmlBlockComponent,
    FaqBlockComponent,
    NewsFeedBlockComponent,
    HeaderLinksBlockComponent,
    FooterContactsBlockComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.less',
})
export class PageComponent {
  readonly slug = input.required<string>();

  private readonly pages = inject(PagesService);
  private readonly layout = inject(LayoutService);
  private readonly router = inject(Router);

  readonly page = signal<PageDetail | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const slug = this.slug();
      if (!slug) return;

      this.loading.set(true);
      this.error.set(null);
      this.page.set(null);

      this.pages.loadPage(slug).subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
          this.layout.applyPageVisibility(page);
        },
        error: (err) => {
          this.loading.set(false);

          // 404 — перенаправляем на красивую страницу "не найдено"
          if (err?.status === 404) {
            this.router.navigate(['/not-found'], {
              replaceUrl: true, // не оставляем кривой URL в истории
              skipLocationChange: false, // адресная строка обновится на /not-found
            });
            return;
          }

          // Прочие ошибки (500, network) — показываем inline-сообщение
          this.error.set('Не удалось загрузить страницу');
          this.layout.resetVisibility();
        },
      });
    });
  }

  shouldRender(placement: PageBlockPlacement): boolean {
    if (!placement.is_visible) return false;
    if (placement.block.type === 'header_links') return false;
    if (placement.block.type === 'footer_contacts') return false;
    return true;
  }

  sortedBlocks(): PageBlockPlacement[] {
    const p = this.page();
    if (!p) return [];
    return [...p.blocks].sort((a, b) => a.position - b.position);
  }
}
