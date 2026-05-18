import { Component, input, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLinksBlock } from '@core/models';

@Component({
  selector: 'app-header-links-block',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-links-block.component.html',
  styleUrl: './header-links-block.component.less',
})
export class HeaderLinksBlockComponent {
  readonly block = input.required<HeaderLinksBlock>();

  readonly sortedLinks = computed(() =>
    this.block()
      .links.filter((l) => l.is_visible)
      .sort((a, b) => a.position - b.position),
  );

  /** Отличает внутренний путь (/about) от внешнего URL (https://...) */
  isExternal(url: string): boolean {
    return /^(https?:)?\/\//.test(url);
  }
}
