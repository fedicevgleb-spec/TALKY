import { initInvisibleScreenCardGradient } from './invisibleScreenCardGradient';
import { initVideoMainViewportVolume } from './videoMainViewportVolume';

initVideoMainViewportVolume();
initInvisibleScreenCardGradient();

const purchaseButtonWrapper = document.querySelectorAll<HTMLElement>('#purchase-button-wrapper');
const purchaseButtonSpotlightLeft = document.querySelectorAll<HTMLElement>('#purchase-button-spotlight-left');
const purchaseButtonSpotlightRight = document.querySelectorAll<HTMLElement>('#purchase-button-spotlight-right');
document.querySelectorAll<HTMLElement>('[data-spotlight], [data-purchase-spotlight]').forEach((el) => {
  el.addEventListener('mousemove', (e: MouseEvent) => {
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
      // purchaseButtonWrapper[0].style.paddingTop = `${padding}px`;
      // purchaseButtonWrapper.style.paddingBottom = `${padding}px`;
      //purchaseButtonSpotlightLeft.style.height = `${height}px`;
      //purchaseButtonSpotlightLeft.style.boxShadow = `-${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
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
      // purchaseButtonWrapper.style.paddingTop = `${padding}px`;
      // purchaseButtonWrapper.style.paddingBottom = `${padding}px`;
      // purchaseButtonSpotlightRight.style.height = `${height}px`;
      // purchaseButtonSpotlightRight.style.boxShadow = `${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
    }
    el.style.setProperty('--mouse-x', `${left}px`);
    el.style.setProperty('--mouse-y', `${top}px`);
  });
});
