import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@layout/header/header.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  private readonly layout = inject(LayoutService);

  readonly showHeader = this.layout.headerVisible;
  readonly showFooter = this.layout.footerVisible;
}
