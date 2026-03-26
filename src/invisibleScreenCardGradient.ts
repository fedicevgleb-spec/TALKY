const CARD_SELECTOR = '.invisibleScreen__cardWrap';

function clamp01ToPercent(value: number): string {
  const n = Math.max(0, Math.min(100, value));
  return `${n}%`;
}

export function initInvisibleScreenCardGradient(): void {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;
      const x = ((e.clientX - rect.left) / w) * 100;
      const y = ((e.clientY - rect.top) / h) * 100;
      card.style.setProperty('--grad-x', clamp01ToPercent(x));
      card.style.setProperty('--grad-y', clamp01ToPercent(y));
    });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--grad-x');
      card.style.removeProperty('--grad-y');
    });
  });
}
