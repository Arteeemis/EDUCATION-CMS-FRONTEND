import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  readonly menu = this.layout.headerLinks;
}
