const MAIN_VIDEO_SELECTOR = '.videoScreen__mainVideo';

const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

export function initVideoMainViewportVolume(): void {
  const node = document.querySelector(MAIN_VIDEO_SELECTOR);
  if (!(node instanceof HTMLVideoElement)) return;
  const el = node;

  let lastIntersectionRatio = 1;
  const maxVolume = 1;

  function applyVolume(): void {
    const v = Math.max(0, Math.min(1, maxVolume * lastIntersectionRatio));
    el.volume = v;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      lastIntersectionRatio = entry.intersectionRatio;
      applyVolume();
    },
    { root: null, threshold: THRESHOLDS }
  );

  observer.observe(el);

  el.addEventListener('click', () => {
    el.muted = !el.muted;
    applyVolume();
    void el.play();
  });
}
