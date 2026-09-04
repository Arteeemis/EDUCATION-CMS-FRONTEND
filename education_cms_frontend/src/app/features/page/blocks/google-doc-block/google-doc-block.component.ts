import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleDocBlock } from '@core/models';
import { SafeHtmlPipe } from '@core/utils/safe-html.pipe';

@Component({
  selector: 'app-google-doc-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './google-doc-block.component.html',
  styleUrl: './google-doc-block.component.less',
})
export class GoogleDocBlockComponent {
  readonly block = input.required<GoogleDocBlock>();
  private readonly sanitizer = inject(DomSanitizer);

  readonly embedUrl = computed<SafeResourceUrl | null>(() =>
    this.createEmbedUrl(this.block().doc_url),
  );

  readonly embedHtml = computed<SafeHtml | null>(() => this.createEmbedHtml(this.block().doc_url));

  readonly isSupported = computed(() => !!this.embedUrl() || !!this.embedHtml());

  private createEmbedHtml(value: string | null | undefined): SafeHtml | null {
    if (!value) return null;
    const trimmed = value.trim();
    if (/^<iframe[\s\S]*>.*<\/iframe>$|^<iframe[\s\S]*\/>$/.test(trimmed)) {
      return this.sanitizer.bypassSecurityTrustHtml(trimmed);
    }
    return null;
  }

  private createEmbedUrl(value: string | null | undefined): SafeResourceUrl | null {
    if (!value) return null;
    const trimmed = value.trim();
    const docId = trimmed.match(/\/document\/d\/([a-zA-Z0-9_-]+)/)?.[1];

    if (docId) {
      // Извлекаем параметры, которые могут быть полезны для Google Docs
      const tabMatch = trimmed.match(/[#?]tab=([a-zA-Z0-9_.]+)/);
      const tabParam = tabMatch ? `?tab=${tabMatch[1]}` : '';

      const embedUrl = `https://docs.google.com/document/d/${docId}/preview${tabParam}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    if (trimmed.includes('docs.google.com/document')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(trimmed);
    }

    return null;
  }
}
