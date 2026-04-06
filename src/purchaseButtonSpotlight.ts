function purchaseButtonMouseMoveHandler(e: MouseEvent, el: HTMLElement | null): void {
  if (window.innerWidth < 1024) return;
  if (!el) return;

  const purchaseButtonWrapper = el.querySelectorAll<HTMLElement>('.purchaseButton__mainWrapper');
  const purchaseButtonSpotlightLeft = el.querySelectorAll<HTMLElement>('.purchaseButton__spotlight');
  const purchaseButtonSpotlightRight = el.querySelectorAll<HTMLElement>('.purchaseButton__spotlight_right');

  const rect = el.getBoundingClientRect();
  const left = e.clientX - rect.left;
  const top = e.clientY - rect.top;

  if (left < 100 && purchaseButtonWrapper && purchaseButtonSpotlightLeft) {
    const padding = (100 - left) / 20;
    const height = 58 * ((100 - left) / 100);
    purchaseButtonWrapper.forEach((wrapper) => {
      wrapper.style.paddingTop = `${padding}px`;
      wrapper.style.paddingBottom = `${padding}px`;
    });
    purchaseButtonSpotlightLeft.forEach((spotlight) => {
      spotlight.style.height = `${height}px`;
      spotlight.style.boxShadow = `-${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
    });
  }

  if (left > 155 && purchaseButtonWrapper && purchaseButtonSpotlightRight) {
    const padding = (100 - (255 - left)) / 20;
    const height = 58 * ((100 - (255 - left)) / 100);
    purchaseButtonWrapper.forEach((wrapper) => {
      wrapper.style.paddingTop = `${padding}px`;
      wrapper.style.paddingBottom = `${padding}px`;
    });
    purchaseButtonSpotlightRight.forEach((spotlight) => {
      spotlight.style.height = `${height}px`;
      spotlight.style.boxShadow = `${height / 4}px 0 ${height / 2}px 0 #ff4d3a`;
    });
  }

  el.style.setProperty('--mouse-x', `${left}px`);
  el.style.setProperty('--mouse-y', `${top}px`);
}

export function initPurchaseButtonSpotlight(): void {
  const heroButton = document.querySelector<HTMLElement>('#heroScreenPurchaseButton');
  const heroButtonSpotlight = heroButton?.querySelector<HTMLElement>('#heroScreenPurchaseButtonSpotlight');

  const pricingButton = document.querySelector<HTMLElement>('#pricingScreenPurchaseButton');
  const pricingButtonSpotlight = pricingButton?.querySelector<HTMLElement>('#pricingScreenPurchaseButtonSpotlight');

  const invisibleScreenTitle = document.querySelector<HTMLElement>('#invisibleScreenTitle');

  heroButtonSpotlight?.addEventListener('mousemove', (e) => purchaseButtonMouseMoveHandler(e, heroButton));
  pricingButtonSpotlight?.addEventListener('mousemove', (e) => purchaseButtonMouseMoveHandler(e, pricingButton));
  invisibleScreenTitle?.addEventListener('mousemove', (e) => purchaseButtonMouseMoveHandler(e, invisibleScreenTitle));
}
