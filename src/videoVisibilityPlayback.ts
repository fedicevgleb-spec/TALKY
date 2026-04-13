const EXCLUDE_SELECTOR = '.videoScreen__mainVideo';

const MIN_VISIBLE_RATIO = 0.1;

/** Frequent thresholds so scroll doesn’t skip updates between steps. */
const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

/**
 * Share of the element’s layout box inside the viewport (no ancestor clipping).
 * Used when we don’t have an IntersectionObserverEntry (e.g. right after deferred `play()`).
 */
function getViewportOverlapRatio(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return 0;

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const visibleTop = Math.max(rect.top, 0);
  const visibleLeft = Math.max(rect.left, 0);
  const visibleBottom = Math.min(rect.bottom, vh);
  const visibleRight = Math.min(rect.right, vw);
  const visibleH = Math.max(0, visibleBottom - visibleTop);
  const visibleW = Math.max(0, visibleRight - visibleLeft);
  const visibleArea = visibleH * visibleW;
  const totalArea = rect.width * rect.height;
  return totalArea > 0 ? visibleArea / totalArea : 0;
}

/**
 * Visible fraction of the target box using intersection data (respects overflow clipping).
 */
function getVisibleRatioFromEntry(entry: IntersectionObserverEntry): number {
  const t = entry.boundingClientRect;
  const inter = entry.intersectionRect;
  if (t.width <= 0 || t.height <= 0) return 0;
  return (inter.width * inter.height) / (t.width * t.height);
}

function shouldPlay(
  video: HTMLVideoElement,
  entry: IntersectionObserverEntry | undefined
): boolean {
  const ratio =
    entry !== undefined ? getVisibleRatioFromEntry(entry) : getViewportOverlapRatio(video);
  if (entry !== undefined && !entry.isIntersecting) return false;
  return ratio >= MIN_VISIBLE_RATIO;
}

function applyPlayback(video: HTMLVideoElement, entry: IntersectionObserverEntry | undefined): void {
  if (video.matches(EXCLUDE_SELECTOR)) return;

  if (shouldPlay(video, entry)) {
    void video.play().catch(() => {});
  } else {
    video.pause();
  }
}

/**
 * Apply play/pause from layout (no IO entry). Call after deferred `load()` / `play()`.
 */
export function syncDecorativeVideoPlayback(video: HTMLVideoElement): void {
  applyPlayback(video, undefined);
}

/**
 * Play decorative videos only while they overlap the viewport enough; pause otherwise.
 * Excludes `.videoScreen__mainVideo` (handled by `videoMainViewportVolume`).
 */
export function initVideoVisibilityPlayback(): void {
  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>(`video:not(${EXCLUDE_SELECTOR})`)
  );

  if (videos.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) continue;
        applyPlayback(video, entry);
      }
    },
    { root: null, threshold: THRESHOLDS }
  );

  function refreshVideo(video: HTMLVideoElement): void {
    observer.unobserve(video);
    observer.observe(video);
  }

  function refreshAll(): void {
    for (const video of videos) {
      refreshVideo(video);
    }
  }

  for (const video of videos) {
    observer.observe(video);
    video.addEventListener('loadeddata', () => syncDecorativeVideoPlayback(video));
    video.addEventListener('playing', () => {
      queueMicrotask(() => syncDecorativeVideoPlayback(video));
    });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      for (const video of videos) {
        syncDecorativeVideoPlayback(video);
      }
    });
  });

  window.addEventListener('resize', refreshAll, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshAll();
  });
  window.addEventListener('pageshow', refreshAll);
}
