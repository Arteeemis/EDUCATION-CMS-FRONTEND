import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.less',
})
export class NotFoundComponent {
  private readonly layout = inject(LayoutService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  constructor() {
    this.layout.resetVisibility();
  }

  goBack(): void {
    const hasHistory = window.history.length > 1;
    if (hasHistory) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
