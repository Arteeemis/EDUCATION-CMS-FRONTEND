import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ExcelEmbedBlock } from '@core/models';
import { SafeHtmlPipe } from '@core/utils/safe-html.pipe';

@Component({
  selector: 'app-excel-embed-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './excel-embed-block.component.html',
  styleUrl: './excel-embed-block.component.less',
})
export class ExcelEmbedBlockComponent {
  readonly block = input.required<ExcelEmbedBlock>();
  private readonly sanitizer = inject(DomSanitizer);

  readonly embedUrl = computed<SafeResourceUrl | null>(() =>
    this.createEmbedUrl(this.block().table_url),
  );

  readonly embedHtml = computed<SafeHtml | null>(() =>
    this.createEmbedHtml(this.block().table_url),
  );

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
    const sheetId = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1];

    if (sheetId) {
      // Извлекаем gid из URL, если он есть
      const gidMatch = trimmed.match(/[?&]gid=(\d+)/);
      const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';

      const embedUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlview?rm=minimal&widget=true${gidParam}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    if (trimmed.includes('docs.google.com/spreadsheets')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(trimmed);
    }

    return null;
  }
}
