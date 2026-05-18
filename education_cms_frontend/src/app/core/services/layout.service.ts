import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { HeaderLinksBlock, FooterContactsBlock, PageDetail } from '@core/models';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly api = inject(ApiService);

  // Глобальные данные (грузятся один раз при старте через provideAppInitializer)
  readonly headerLinks = signal<HeaderLinksBlock | null>(null);
  readonly footerContacts = signal<FooterContactsBlock | null>(null);

  // Видимость на текущей странице. По умолчанию true — header/footer показываются,
  // если данные есть. PageComponent при загрузке страницы выставляет эти флаги
  // на основе is_visible соответствующих блоков (если они присутствуют на странице).
  readonly headerVisible = signal(true);
  readonly footerVisible = signal(true);

  /** Один раз грузит шапку и подвал. Вызывается из APP_INITIALIZER. */
  async loadLayout(): Promise<void> {
    await Promise.allSettled([this.loadHeader(), this.loadFooter()]);
  }

  /**
   * Применить настройки видимости из загруженной страницы.
   * Если блок присутствует на странице — берём его is_visible.
   * Если блок отсутствует на странице — оставляем true (показываем глобальный).
   */
  applyPageVisibility(page: PageDetail): void {
    const headerPlacement = page.blocks.find((p) => p.block.type === 'header_links');
    const footerPlacement = page.blocks.find((p) => p.block.type === 'footer_contacts');

    this.headerVisible.set(headerPlacement ? headerPlacement.is_visible : true);
    this.footerVisible.set(footerPlacement ? footerPlacement.is_visible : true);
  }

  /** Сбросить видимость к дефолту (вызывается на страницах вне PageComponent, например News-detail). */
  resetVisibility(): void {
    this.headerVisible.set(true);
    this.footerVisible.set(true);
  }

  private async loadHeader(): Promise<void> {
    try {
      const data = await firstValueFrom(this.api.get<HeaderLinksBlock>('/header-menu/'));
      this.headerLinks.set(data);
    } catch {
      this.headerLinks.set(null);
    }
  }

  private async loadFooter(): Promise<void> {
    try {
      const data = await firstValueFrom(this.api.get<FooterContactsBlock>('/footer/'));
      this.footerContacts.set(data);
    } catch {
      this.footerContacts.set(null);
    }
  }
}
