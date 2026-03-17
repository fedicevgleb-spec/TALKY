const spotlightEl = document.querySelector<HTMLElement>('[data-spotlight]');
if (spotlightEl) {
  spotlightEl.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = spotlightEl.getBoundingClientRect();
    spotlightEl.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    spotlightEl.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
}
