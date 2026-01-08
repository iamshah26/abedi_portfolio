/**
 * Google Ads Conversion Tracking Utility
 * 
 * This utility provides helper functions for tracking conversions
 * across the portfolio website.
 */

/**
 * Report a conversion event to Google Ads
 * @param {string} url - Optional URL to redirect to after tracking
 * @returns {boolean} - Returns false to prevent default link behavior
 */
export function reportConversion(url) {
  // Check if gtag is available
  if (typeof gtag === 'undefined') {
    console.warn('Google Tag Manager not loaded');
    if (url) window.location = url;
    return false;
  }

  const callback = function () {
    if (typeof url !== 'undefined' && url) {
      window.location = url;
    }
  };

  gtag('event', 'conversion', {
    'send_to': 'AW-17860855267/E5GJCPGiq98bEOOL3MRC',
    'event_callback': callback
  });

  return false;
}

/**
 * Track phone call click
 * @param {string} phoneNumber - Phone number in format: tel:+923367048278
 * @returns {boolean} - Returns false to prevent default link behavior
 */
export function trackPhoneClick(phoneNumber) {
  return reportConversion(phoneNumber);
}

/**
 * Track WhatsApp click
 * @param {string} whatsappUrl - WhatsApp URL in format: https://wa.me/923367048278
 * @returns {boolean} - Returns false to prevent default link behavior
 */
export function trackWhatsAppClick(whatsappUrl) {
  return reportConversion(whatsappUrl);
}

/**
 * Track form submission conversion
 * Call this after a successful form submission
 */
export function trackFormSubmit() {
  if (typeof gtag === 'undefined') {
    console.warn('Google Tag Manager not loaded');
    return;
  }

  gtag('event', 'conversion', {
    'send_to': 'AW-17860855267/E5GJCPGiq98bEOOL3MRC'
  });
}

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional event parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof gtag === 'undefined') {
    console.warn('Google Tag Manager not loaded');
    return;
  }

  gtag('event', eventName, eventParams);
}
