import { initHeaderDatetime } from './headerDatetime';
import { initVideoVisibilityPlayback } from './videoVisibilityPlayback';

// real current datetime in header
initHeaderDatetime();
// play/pause footer (and any) decorative videos by viewport
initVideoVisibilityPlayback();
