import { Component, inject, signal, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from '@core/services/layout.service';
import { HeaderLinksBlockComponent } from '@features/page/blocks/header-links-block/header-links-block.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, HeaderLinksBlockComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  private readonly layout = inject(LayoutService);
  private readonly router = inject(Router);

  readonly menu = this.layout.headerLinks;
  readonly mobileOpen = signal(false);

  constructor() {
    // Закрываем меню при переходе по ссылке
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.mobileOpen.set(false));
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  // Закрываем меню по Escape
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileOpen()) this.closeMobile();
  }
}
