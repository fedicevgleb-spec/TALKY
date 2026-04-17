/** Stripe Checkout: POST to Flask at project root (`/create-checkout-session`). */
async function startCheckout(): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/create-checkout-session', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
  } catch {
    window.alert('Network error. Check your connection and try again.');
    return;
  }

  let data: { url?: string; error?: string };
  try {
    data = (await res.json()) as { url?: string; error?: string };
  } catch {
    window.alert('Unexpected response from server.');
    return;
  }

  if (!res.ok) {
    window.alert(data.error ?? 'Checkout could not be started.');
    return;
  }
  if (data.url) {
    window.location.assign(data.url);
    return;
  }
  window.alert('Checkout URL missing.');
}

export function initCheckoutButtons(): void {
  // Clicks on the glow (`.purchaseButton__spotlight*`) hit those divs, not the inner `<button>`.
  // Listen on the whole layout wrapper in capture phase so one click works anywhere in the pill.
  const wrapperIds = ['heroScreenPurchaseButton', 'pricingScreenPurchaseButton'];
  for (const id of wrapperIds) {
    const el = document.getElementById(id);
    el?.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        void startCheckout();
      },
      true,
    );
  }
}
