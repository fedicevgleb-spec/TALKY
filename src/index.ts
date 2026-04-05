import { initFeaturesScreenTeleprompter } from './featuresScreenTeleprompter';
import { initHeaderDatetime } from './headerDatetime';
import { initHeroWaterfallPlaceholder } from './heroWaterfallPlaceholder';
import { initInvisibleScreenCardGradient } from './invisibleScreenCardGradient';
import { initPurchaseButtonSpotlight } from './purchaseButtonSpotlight';
import { initVideoSecondaryDeferredLoad } from './videoSecondaryDeferredLoad';
import { initVideoMainViewportVolume } from './videoMainViewportVolume';


// placeholdres for hero video (depends on the viewport width)
initHeroWaterfallPlaceholder();
// real current datetime in header
initHeaderDatetime();
// less important videos load controller
initVideoSecondaryDeferredLoad();
// volume controller for video main viewport
initVideoMainViewportVolume();
// invisible screen cards gradients animation controller
initInvisibleScreenCardGradient();
// teleprompter demo
initFeaturesScreenTeleprompter();
// purchase button animation controller
initPurchaseButtonSpotlight();
