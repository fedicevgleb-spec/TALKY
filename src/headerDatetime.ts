export function initHeaderDatetime(): void {
  const el = document.getElementById('header-datetime');
  if (!el) return;

  function updateDateTime(): void {
    const now = new Date();
    el!.textContent =
      now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', '') +
      ' ' +
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}
