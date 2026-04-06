const MIN_PX_PER_S = 18;
const MAX_PX_PER_S = 88;
const DEFAULT_SPEED = 0.45;

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function pxPerSecondFromSlider(t: number): number {
  return MIN_PX_PER_S + (MAX_PX_PER_S - MIN_PX_PER_S) * clamp01(t);
}

function normalizeOffset(offsetY: number, loopPx: number): number {
  if (loopPx <= 0) return 0;
  let y = offsetY;
  while (y < -loopPx) y += loopPx;
  while (y > 0) y -= loopPx;
  return y;
}

export function initFeaturesScreenTeleprompter(): void {
  const root = document.querySelector<HTMLElement>('#featuresScreenSpeedRoot');
  const track = document.querySelector<HTMLElement>('#featuresTeleprompterTrack');
  const sliderTrack = document.querySelector<HTMLElement>('#featuresScreenSpeedSlider .featuresScreen__speedTrack');
  const playBtn = document.querySelector<HTMLButtonElement>('#featuresScreenPlayBtn');

  if (!root || !track || !sliderTrack) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let pxPerSec = pxPerSecondFromSlider(DEFAULT_SPEED);
  let offsetY = 0;
  let lastTs = 0;

  const loopHeightPx = (): number => track.scrollHeight / 2;

  const applySliderVisual = (speed: number) => {
    const t = clamp01(speed);
    root.style.setProperty('--speed', String(t));
    sliderTrack.setAttribute('aria-valuenow', String(Math.round(t * 100)));
    pxPerSec = pxPerSecondFromSlider(t);
  };

  const applyTransform = () => {
    const loop = loopHeightPx();
    if (loop > 0) {
      offsetY = normalizeOffset(offsetY, loop);
      track.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    }
  };

  const tick = (now: number) => {
    requestAnimationFrame(tick);

    const paused = track.classList.contains('featuresScreen__teleprompterTrack_paused');
    if (paused) {
      lastTs = now;
      return;
    }

    if (!lastTs) lastTs = now;
    let dt = (now - lastTs) / 1000;
    lastTs = now;
    if (dt > 0.1) dt = 0.1;

    const loop = loopHeightPx();
    if (loop <= 0) return;

    offsetY -= pxPerSec * dt;
    offsetY = normalizeOffset(offsetY, loop);
    track.style.transform = `translate3d(0, ${offsetY}px, 0)`;
  };

  applySliderVisual(DEFAULT_SPEED);

  if (reduced.matches) {
    sliderTrack.setAttribute('aria-disabled', 'true');
    sliderTrack.tabIndex = -1;
    if (playBtn) playBtn.disabled = true;
    return;
  }

  const speedThumb = sliderTrack.querySelector<HTMLElement>('.featuresScreen__speedThumb');

  const setFromClientX = (clientX: number) => {
    const rect = sliderTrack.getBoundingClientRect();
    const x = clientX - rect.left;
    applySliderVisual(x / rect.width);
  };

  sliderTrack.addEventListener('pointerdown', (e) => {
    speedThumb?.classList.add('featuresScreen__speedThumb_interacted');
    sliderTrack.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  });

  sliderTrack.addEventListener('pointermove', (e) => {
    if (!sliderTrack.hasPointerCapture(e.pointerId)) return;
    setFromClientX(e.clientX);
  });

  sliderTrack.addEventListener('pointerup', (e) => {
    if (sliderTrack.hasPointerCapture(e.pointerId)) {
      sliderTrack.releasePointerCapture(e.pointerId);
    }
  });

  sliderTrack.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 0.1 : 0.05;
    const current = parseFloat(getComputedStyle(root).getPropertyValue('--speed')) || DEFAULT_SPEED;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      applySliderVisual(current - step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      applySliderVisual(current + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      applySliderVisual(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      applySliderVisual(1);
    }
  });

  playBtn?.addEventListener('click', () => {
    playBtn.classList.add('featuresScreen__playBtn_interacted');
    const playing = playBtn.classList.toggle('featuresScreen__playBtn_playing');
    track.classList.toggle('featuresScreen__teleprompterTrack_paused', !playing);
    playBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    playBtn.setAttribute(
      'aria-label',
      playing ? 'Pause teleprompter preview' : 'Play teleprompter preview',
    );
    if (playing) lastTs = 0;
  });

  const ro = new ResizeObserver(() => {
    applyTransform();
  });
  ro.observe(track);

  requestAnimationFrame(() => {
    applyTransform();
    lastTs = 0;
    requestAnimationFrame(tick);
  });
}
