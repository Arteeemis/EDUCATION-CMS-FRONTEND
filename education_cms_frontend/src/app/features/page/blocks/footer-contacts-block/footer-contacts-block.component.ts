import { Component, input, computed } from '@angular/core';
import { FooterContactsBlock } from '@core/models';

interface SocialLink {
  label: string;
  url: string;
  icon: 'vk' | 'tg' | 'max';
}

@Component({
  selector: 'app-footer-contacts-block',
  standalone: true,
  templateUrl: './footer-contacts-block.component.html',
  styleUrl: './footer-contacts-block.component.less',
})
export class FooterContactsBlockComponent {
  readonly block = input.required<FooterContactsBlock>();

  readonly workingHours = computed(() => {
    const b = this.block();
    if (!b.open_time || !b.close_time) return null;
    return `${this.shortTime(b.open_time)}–${this.shortTime(b.close_time)}`;
  });

  readonly socials = computed<SocialLink[]>(() => {
    const b = this.block();
    const list: SocialLink[] = [];
    if (b.vk_url) list.push({ label: 'VK', url: b.vk_url, icon: 'vk' });
    if (b.tg_url) list.push({ label: 'Telegram', url: b.tg_url, icon: 'tg' });
    if (b.max_url) list.push({ label: 'MAX', url: b.max_url, icon: 'max' });
    return list;
  });

  private shortTime(value: string): string {
    return value.slice(0, 5);
  }
}
