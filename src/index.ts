import { initCheckoutButtons } from './checkout';
import { initFeaturesScreenTeleprompter } from './featuresScreenTeleprompter';
import { initHeaderDatetime } from './headerDatetime';
import { initHeroWaterfallPlaceholder } from './heroWaterfallPlaceholder';
import { initInvisibleScreenCardGradient } from './invisibleScreenCardGradient';
import { initPurchaseButtonSpotlight } from './purchaseButtonSpotlight';
import { initVideoSecondaryDeferredLoad } from './videoSecondaryDeferredLoad';
import { initVideoMainViewportVolume } from './videoMainViewportVolume';
import { initVideoVisibilityPlayback } from './videoVisibilityPlayback';


// placeholdres for hero video (depends on the viewport width)
initHeroWaterfallPlaceholder();
// real current datetime in header
initHeaderDatetime();
// less important videos load controller
initVideoSecondaryDeferredLoad();
// play/pause decorative videos by viewport; tab refresh via unobserve/observe
initVideoVisibilityPlayback();
// volume controller for video main viewport
initVideoMainViewportVolume();
// invisible screen cards gradients animation controller
initInvisibleScreenCardGradient();
// teleprompter demo
initFeaturesScreenTeleprompter();
// purchase button animation controller
initPurchaseButtonSpotlight();
// Stripe Checkout (Flask `app.py` in repo root — same origin when served by Flask)
initCheckoutButtons();
