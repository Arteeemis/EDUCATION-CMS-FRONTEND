import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.less',
})
export class NotFoundComponent {
  private readonly layout = inject(LayoutService);

  constructor() {
    this.layout.resetVisibility();
  }
}
