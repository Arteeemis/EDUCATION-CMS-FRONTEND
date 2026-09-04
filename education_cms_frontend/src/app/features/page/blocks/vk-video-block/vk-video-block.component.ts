import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VkVideoBlock } from '@core/models';

@Component({
  selector: 'app-vk-video-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vk-video-block.component.html',
  styleUrl: './vk-video-block.component.less',
})
export class VkVideoBlockComponent {
  readonly block = input.required<VkVideoBlock>();
  private readonly sanitizer = inject(DomSanitizer);

  readonly embedUrl = computed(() => {
    const url = this.block().video_url?.trim();
    if (!url) return null;

    // Извлекаем ID видео из ссылки вида https://vk.com/video-123456_654321
    const match = url.match(/video(-?\d+)_(\d+)/);
    if (!match) return null;

    const ownerId = match[1];
    const videoId = match[2];
    const embedSrc = `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedSrc) as SafeResourceUrl;
  });
}
