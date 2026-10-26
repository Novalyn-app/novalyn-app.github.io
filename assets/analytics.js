/**
 * Novalyn site analytics — cookieless, aggregate only.
 *
 * Ships inert. With no website id this file loads nothing, requests nothing and
 * attaches no listener, so a stock checkout of the site behaves exactly as it
 * did before. Fill in the id from the Umami dashboard to switch it on: every
 * page already includes this file, and nothing else has to change.
 *
 * What it counts: page views (Umami's own script) and two click events —
 * a click on a Chrome Web Store link, and a click on the demo. No cookies, no
 * fingerprint, no identifier that survives the visit.
 */
const UMAMI_WEBSITE_ID = '';

(function () {
  'use strict';

  if (!UMAMI_WEBSITE_ID) return;

  function load() {
    var script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
    document.head.appendChild(script);
  }

  /** Never let analytics break a click: no tracker, no error, no throw. */
  function track(name, data) {
    if (!window.umami || typeof window.umami.track !== 'function') return;
    try {
      window.umami.track(name, data);
    } catch (error) {
      /* ignore */
    }
  }

  // Where a click came from, named from the closest landmark on the page.
  // Order matters: the page chrome first, then the sections that carry a store
  // button, so a nested call-to-action cannot claim a broader region.
  var REGIONS = [
    ['footer', 'footer'],
    ['.site-header', 'nav'],
    ['#pricing', 'pricing'],
    ['.hero', 'hero'],
    ['.demo-page', 'demo'],
    ['.prose', 'guide'],
    ['.page-head', 'guide'],
    ['.cta-row', 'guide'],
    ['.band', 'footer']
  ];

  function regionOf(el) {
    for (var i = 0; i < REGIONS.length; i++) {
      if (el.closest(REGIONS[i][0])) return REGIONS[i][1];
    }
    // A store link inside <main> with no section around it is the page's own
    // call to action, which is what "hero" means here.
    return 'hero';
  }

  function isDemoLink(anchor) {
    var path;
    try {
      path = new URL(anchor.href, location.href).pathname;
    } catch (error) {
      return false;
    }
    return /\/demo\/?$/.test(path);
  }

  function onClick(event) {
    var target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    var anchor = target.closest('a');
    if (!anchor) return;

    var href = anchor.getAttribute('href') || '';
    if (href.indexOf('chromewebstore.google.com') !== -1) {
      track('store-click', { from: regionOf(anchor) });
      return;
    }
    if (isDemoLink(anchor)) {
      track('demo-open', { from: regionOf(anchor) });
    }
  }

  load();
  document.addEventListener('click', onClick, false);
})();
