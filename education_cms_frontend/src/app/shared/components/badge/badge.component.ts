import { Component, input } from '@angular/core';

export type BadgeVariant = 'urgent' | 'tag' | 'neutral' | 'accent';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="badge" [attr.data-variant]="variant()"><ng-content /></span>`,
  styleUrl: './badge.component.less',
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('neutral');
}
