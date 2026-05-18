import { Component, inject } from '@angular/core';
import { LayoutService } from '@core/services/layout.service';
import { FooterContactsBlockComponent } from '@features/page/blocks/footer-contacts-block/footer-contacts-block.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterContactsBlockComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
})
export class FooterComponent {
  private readonly layout = inject(LayoutService);
  readonly contacts = this.layout.footerContacts;
}
