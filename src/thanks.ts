import { initHeaderDatetime } from './headerDatetime';
import { initPurchaseButtonSpotlight } from './purchaseButtonSpotlight';

function initThanksDownloadLink(): void {
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  const link = document.querySelector<HTMLAnchorElement>('.thanksDownloadLink');
  if (!link) return;

  if (sessionId) {
    link.href = `/download?session_id=${encodeURIComponent(sessionId)}`;
    return;
  }

  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');
  link.style.pointerEvents = 'none';
  link.style.opacity = '0.5';
}

initHeaderDatetime();
initPurchaseButtonSpotlight();
initThanksDownloadLink();
