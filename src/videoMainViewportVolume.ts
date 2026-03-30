const MAIN_VIDEO_SELECTOR = '.videoScreen__mainVideo';

const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

const MOBILE_PLAYBACK_MQ = '(pointer: coarse) and (hover: none)';
const MIN_VISIBLE_RATIO = 0.05;

export function initVideoMainViewportVolume(): void {
  const node = document.querySelector(MAIN_VIDEO_SELECTOR);
  if (!(node instanceof HTMLVideoElement)) return;
  const el = node;

  const useMobilePause = window.matchMedia(MOBILE_PLAYBACK_MQ).matches;

  let lastIntersectionRatio = 1;
  const maxVolume = 1;

  function applyVolume(): void {
    if (useMobilePause) {
      el.volume = maxVolume;
      return;
    }
    const v = Math.max(0, Math.min(1, maxVolume * lastIntersectionRatio));
    el.volume = v;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (useMobilePause) {
        if (!entry.isIntersecting || entry.intersectionRatio < MIN_VISIBLE_RATIO) {
          el.pause();
        } else {
          void el.play();
        }
        return;
      }

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
