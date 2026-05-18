import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostPreview } from '@core/models';
import { BadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.less',
})
export class PostCardComponent {
  readonly post = input.required<PostPreview>();

  /** Теги приходят как строка "поступление, магистратура" → массив */
  readonly tags = computed(
    () =>
      this.post()
        .tags.split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3), // показываем максимум 3
  );
}
