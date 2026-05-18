import { Component, input } from '@angular/core';
import { HtmlBlock } from '@core/models';
import { SafeHtmlPipe } from '@core/utils/safe-html.pipe';

@Component({
  selector: 'app-html-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: ` <div class="html-block" [innerHTML]="block().html_content | safeHtml"></div> `,
  styleUrl: './html-block.component.less',
})
export class HtmlBlockComponent {
  readonly block = input.required<HtmlBlock>();
}
