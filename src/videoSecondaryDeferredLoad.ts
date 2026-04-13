const PRIMARY_SELECTORS = ['.hero__waterfall', '.videoScreen__mainVideo'] as const;
const SECONDARY_SELECTOR =
  '.videoScreen__bgVideo, .invisibleScreen__bgVideo, .supportScreen__video, .footerVideo';

import { syncDecorativeVideoPlayback } from './videoVisibilityPlayback';

const PRIMARY_READY_TIMEOUT_MS = 12000;

function waitForVideoReady(video: HTMLVideoElement | null): Promise<void> {
  if (!video) return Promise.resolve();
  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return Promise.resolve();

  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeoutId);
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('error', onReady);
      resolve();
    };
    const onReady = () => finish();
    const timeoutId = window.setTimeout(finish, PRIMARY_READY_TIMEOUT_MS);
    video.addEventListener('canplaythrough', onReady);
    video.addEventListener('error', onReady);
  });
}

function resolveDeferredSrc(video: HTMLVideoElement): string | null {
  const srcset = video.getAttribute('data-deferred-srcset');
  if (srcset && window.devicePixelRatio >= 2) {
    return srcset;
  }
  return video.getAttribute('data-deferred-src');
}

function hydrateDeferredVideo(video: HTMLVideoElement): void {
  const deferredSrc = resolveDeferredSrc(video);
  if (deferredSrc) {
    video.src = deferredSrc;
    video.removeAttribute('data-deferred-src');
    video.removeAttribute('data-deferred-srcset');
  } else {
    for (const source of video.querySelectorAll<HTMLSourceElement>('source[data-deferred-src]')) {
      const url = source.getAttribute('data-deferred-src');
      if (!url) continue;
      source.src = url;
      source.removeAttribute('data-deferred-src');
    }
  }
  video.load();
  if (video.autoplay) {
    void video.play().catch(() => {});
  }
}

async function runSecondaryDeferredLoad(): Promise<void> {
  const primaries = PRIMARY_SELECTORS.map((sel) => document.querySelector<HTMLVideoElement>(sel));
  await Promise.all(primaries.map((v) => waitForVideoReady(v)));

  const secondaries = document.querySelectorAll<HTMLVideoElement>(SECONDARY_SELECTOR);
  for (const video of secondaries) {
    hydrateDeferredVideo(video);
    syncDecorativeVideoPlayback(video);
  }
}

export function initVideoSecondaryDeferredLoad(): void {
  void runSecondaryDeferredLoad();
}
