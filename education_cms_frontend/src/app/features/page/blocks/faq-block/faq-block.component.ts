import { Component, input, signal, computed } from '@angular/core';
import { FaqBlock } from '@core/models';

@Component({
  selector: 'app-faq-block',
  standalone: true,
  templateUrl: './faq-block.component.html',
  styleUrl: './faq-block.component.less',
})
export class FaqBlockComponent {
  readonly block = input.required<FaqBlock>();

  /** Set с id раскрытых вопросов */
  private readonly openIds = signal<Set<number>>(new Set());

  readonly sortedQuestions = computed(() =>
    [...this.block().questions].sort((a, b) => a.position - b.position),
  );

  isOpen(id: number): boolean {
    return this.openIds().has(id);
  }

  toggle(id: number): void {
    this.openIds.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
