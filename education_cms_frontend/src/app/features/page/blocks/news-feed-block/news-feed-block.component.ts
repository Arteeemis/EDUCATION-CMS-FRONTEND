import { Component, input } from '@angular/core';
import { NewsFeedBlock } from '@core/models';
import { PostCardComponent } from '@shared/components/post-card/post-card.component';

@Component({
  selector: 'app-news-feed-block',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './news-feed-block.component.html',
  styleUrl: './news-feed-block.component.less',
})
export class NewsFeedBlockComponent {
  readonly block = input.required<NewsFeedBlock>();
}
