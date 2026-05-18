import { Component, input, computed } from '@angular/core';
import { FooterContactsBlock } from '@core/models';

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
    return `${this.shortTime(b.open_time)} – ${this.shortTime(b.close_time)}`;
  });

  private shortTime(value: string): string {
    // "09:00:00" → "09:00"
    return value.slice(0, 5);
  }
}
