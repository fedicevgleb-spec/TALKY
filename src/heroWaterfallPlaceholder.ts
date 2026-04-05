export function initHeroWaterfallPlaceholder(): void {
  const wrapper = document.querySelector('.hero__videoWrapper');
  const video = document.querySelector<HTMLVideoElement>('.hero__waterfall');
  if (!wrapper || !video) return;

  video.addEventListener('canplaythrough', () => {
    wrapper.classList.add('hero__videoWrapper--videoReady');
  }, { once: true });
}
