/**
 * Google Ads lead-conversion event (tag configured in index.html). Fire-and-forget: it never delays
 * or blocks the navigation the visitor asked for.
 */
export function trackContact(kind) {
  try {
    window.gtag?.('event', 'conversion', { send_to: 'AW-17860855267/L1TqCOyqr98bEOOL3MRC', event_label: kind })
  } catch {
    /* analytics must never break the page */
  }
}
