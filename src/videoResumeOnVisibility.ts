const EXCLUDE_SELECTOR = '.videoScreen__mainVideo';

function resumeAllVideos(): void {
  for (const video of document.querySelectorAll<HTMLVideoElement>(
    `video:not(${EXCLUDE_SELECTOR})`
  )) {
    void video.play().catch(() => {});
  }
}

export function initVideoResumeOnVisibility(): void {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') resumeAllVideos();
  });
  window.addEventListener('pageshow', () => {
    resumeAllVideos();
  });
}
