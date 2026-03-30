import { initInvisibleScreenCardGradient } from './invisibleScreenCardGradient';
import { initVideoMainViewportVolume } from './videoMainViewportVolume';

const heroScreenPurchaseButton = document.querySelector<HTMLElement>('#heroScreenPurchaseButton');
const heroScreenPurchaseButtonSpotlight = heroScreenPurchaseButton?.querySelector<HTMLElement>('#heroScreenPurchaseButtonSpotlight');
const pricingScreenPurchaseButton = document.querySelector<HTMLElement>('#pricingScreenPurchaseButton');
const pricingScreenPurchaseButtonSpotlight = pricingScreenPurchaseButton?.querySelector<HTMLElement>('#pricingScreenPurchaseButtonSpotlight');
const invisibleScreenTitle = document.querySelector<HTMLElement>('#invisibleScreenTitle');
const purchaseButtonMouseMoveHandler = (e: MouseEvent, el: HTMLElement | null) => {
  const clientWidth = window.innerWidth;
  if (clientWidth < 1024) return;
  if (!el) return;
  const purchaseButtonWrapper = el.querySelectorAll<HTMLElement>('#purchase-button-wrapper');
  const purchaseButtonSpotlightLeft = el.querySelectorAll<HTMLElement>('#purchase-button-spotlight-left');
  const purchaseButtonSpotlightRight = el.querySelectorAll<HTMLElement>('#purchase-button-spotlight-right');

  const rect = el.getBoundingClientRect();
  const left = e.clientX - rect.left;
  const top = e.clientY - rect.top;
  if (left < 100 && purchaseButtonWrapper && purchaseButtonSpotlightLeft) {
    const padding = (100 - left) / 20;
    const percentage = (100 - left) / 100;
    const basicHeight = 58;
    const height = basicHeight * percentage;
    purchaseButtonWrapper.forEach((wrapper) => {
      wrapper.style.paddingTop = `${padding}px`;
      wrapper.style.paddingBottom = `${padding}px`;
    })
    purchaseButtonSpotlightLeft.forEach((spotlight) => {
      spotlight.style.height = `${height}px`;
      spotlight.style.boxShadow = `-${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
    })
  }
  if (left > 155 && purchaseButtonWrapper && purchaseButtonSpotlightRight) {
    const padding = (100 - (255 - left)) / 20;
    const percentage = (100 - (255 - left)) / 100;
    const basicHeight = 58;
    const height = basicHeight * percentage;
    purchaseButtonWrapper.forEach((wrapper) => {
      wrapper.style.paddingTop = `${padding}px`;
      wrapper.style.paddingBottom = `${padding}px`;
    })
    purchaseButtonSpotlightRight.forEach((spotlight) => {
      spotlight.style.height = `${height}px`;
      spotlight.style.boxShadow = `${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
    })
  }
  el.style.setProperty('--mouse-x', `${left}px`);
  el.style.setProperty('--mouse-y', `${top}px`);
}

initVideoMainViewportVolume();
initInvisibleScreenCardGradient();
heroScreenPurchaseButtonSpotlight?.addEventListener('mousemove', (e: MouseEvent) => purchaseButtonMouseMoveHandler(e, heroScreenPurchaseButton));
pricingScreenPurchaseButtonSpotlight?.addEventListener('mousemove', (e: MouseEvent) => purchaseButtonMouseMoveHandler(e, pricingScreenPurchaseButton));
invisibleScreenTitle?.addEventListener('mousemove', (e: MouseEvent) => purchaseButtonMouseMoveHandler(e, invisibleScreenTitle));