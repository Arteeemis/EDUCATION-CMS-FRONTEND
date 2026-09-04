import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksBlock } from '@core/models';

interface LinkItem {
  url: string;
  description: string | null;
}

@Component({
  selector: 'app-links-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links-block.component.html',
  styleUrl: './links-block.component.less',
})
export class LinksBlockComponent {
  readonly block = input.required<LinksBlock>();

  readonly links = computed(() => {
    const b = this.block();
    const list: LinkItem[] = [];

    for (let i = 1; i <= 6; i++) {
      const urlKey = `link${i}` as keyof LinksBlock;
      const descKey = `link${i}_desc` as keyof LinksBlock;

      const url = b[urlKey];
      const desc = b[descKey];

      if (url && typeof url === 'string' && url.trim()) {
        list.push({
          url: url.trim(),
          description: typeof desc === 'string' && desc.trim() ? desc.trim() : null,
        });
      }
    }

    return list;
  });

  readonly hasLinks = computed(() => this.links().length > 0);

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
