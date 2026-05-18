import { Component } from '@angular/core';

@Component({
  selector: 'app-news-list',
  standalone: true,
  template: `
    <section class="placeholder">
      <h1>Лента публикаций</h1>
      <p>Будет реализована в Этапе 4.</p>
    </section>
  `,
  styles: [
    `
      .placeholder {
        max-width: 1280px;
        margin: 0 auto;
        padding: 64px 24px;
      }
      h1 {
        font-size: 32px;
        margin-bottom: 16px;
      }
    `,
  ],
})
export class NewsListComponent {}
