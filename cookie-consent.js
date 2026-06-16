/**
 * treatme.life — Cookie Consent + Google Consent Mode v2
 * GDPR compliant (EU/Croatia)
 * Podržava HR/EN
 * GA4 se učitava kroz GTM — ovdje samo Consent Mode signali i banner.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'tm-cookie-consent';

  /* ── 1. Google Consent Mode v2 — defaultno SVE ODBIJENO ─────────
     Mora biti postavljeno PRIJE GTM snippeta.
  ─────────────────────────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    analytics_storage:    'denied',
    ad_storage:           'denied',
    ad_user_data:         'denied',
    ad_personalization:   'denied',
    functionality_storage:'granted',
    security_storage:     'granted',
    wait_for_update: 500
  });

  /* ── 2. Provjeri postojeći pristanak ─────────────────────────── */
  var saved = localStorage.getItem(STORAGE_KEY);

  if (saved === 'all') {
    grantAll();
    // GA4 + Ads + Pixel se učitavaju kroz GTM koji čita Consent Mode
  } else if (saved === 'essential') {
    // GTM je na stranici ali Consent Mode ostaje denied — nema trackinga
  } else {
    // Nema odabira — prikaži banner
    document.addEventListener('DOMContentLoaded', showBanner);
  }

  /* ── 3. Odobri sve kolačiće ──────────────────────────────────── */
  function grantAll() {
    gtag('consent', 'update', {
      analytics_storage:  'granted',
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted'
    });
  }

  /* ── 4. Prikaži banner ───────────────────────────────────────── */
  function showBanner() {
    var lang = document.documentElement.getAttribute('data-lang') || 'hr';

    var texts = {
      hr: {
        title:   'Koristimo kolačiće',
        body:    'Koristimo analitičke kolačiće (Google Analytics) kako bismo razumjeli kako korisnici dolaze na stranicu i poboljšali iskustvo. Nužni kolačići (postavke jezika) uvijek su aktivni.',
        all:     'Prihvati sve',
        ess:     'Samo nužne',
        more:    'Politika kolačića',
      },
      en: {
        title:   'We use cookies',
        body:    'We use analytics cookies (Google Analytics) to understand how visitors find our site and improve their experience. Essential cookies (language settings) are always active.',
        all:     'Accept all',
        ess:     'Essential only',
        more:    'Cookie policy',
      }
    };
    var t = texts[lang] || texts.hr;

    var banner = document.createElement('div');
    banner.id = 'tm-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.title);
    banner.innerHTML =
      '<div id="tm-cb-inner">' +
        '<div id="tm-cb-text">' +
          '<strong id="tm-cb-title">' + t.title + '</strong>' +
          '<p id="tm-cb-body">' + t.body + '</p>' +
          '<a href="/pravila#cookies" id="tm-cb-more">' + t.more + ' →</a>' +
        '</div>' +
        '<div id="tm-cb-btns">' +
          '<button id="tm-cb-ess">' + t.ess + '</button>' +
          '<button id="tm-cb-all">' + t.all + '</button>' +
        '</div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent =
      '#tm-cookie-banner{' +
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
        'background:#E8E1D2;border-top:1px solid #D2C8B0;' +
        'padding:20px clamp(16px,4vw,52px);' +
        'font-family:\'Inter\',system-ui,sans-serif;' +
        'animation:tmCbIn .3s ease;' +
      '}' +
      '@keyframes tmCbIn{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}' +
      '#tm-cb-inner{' +
        'max-width:1280px;margin:0 auto;' +
        'display:flex;align-items:center;gap:24px;flex-wrap:wrap;' +
        'justify-content:space-between;' +
      '}' +
      '#tm-cb-text{flex:1;min-width:260px;}' +
      '#tm-cb-title{font-size:14px;font-weight:600;color:#08272D;display:block;margin-bottom:4px;}' +
      '#tm-cb-body{font-size:13px;color:#5A5546;line-height:1.55;margin:0;}' +
      '#tm-cb-more{font-size:12px;color:#5A5546;text-decoration:underline;margin-top:4px;display:inline-block;}' +
      '#tm-cb-btns{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;}' +
      '#tm-cb-ess{' +
        'padding:10px 20px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;' +
        'background:transparent;border:1.5px solid #D2C8B0;color:#5A5546;' +
        'transition:border-color .2s,color .2s;' +
      '}' +
      '#tm-cb-ess:hover{border-color:#08272D;color:#08272D;}' +
      '#tm-cb-all{' +
        'padding:10px 20px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;' +
        'background:#D9F100;border:none;color:#08272D;' +
        'transition:opacity .2s;' +
      '}' +
      '#tm-cb-all:hover{opacity:.85;}' +
      '@media(max-width:600px){' +
        '#tm-cb-inner{flex-direction:column;align-items:stretch;}' +
        '#tm-cb-btns{justify-content:stretch;}' +
        '#tm-cb-ess,#tm-cb-all{flex:1;text-align:center;}' +
      '}';

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('tm-cb-all').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'all');
      grantAll();
      hideBanner();
    });

    document.getElementById('tm-cb-ess').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'essential');
      hideBanner();
    });
  }

  function hideBanner() {
    var b = document.getElementById('tm-cookie-banner');
    if (b) {
      b.style.transition = 'transform .3s ease, opacity .3s';
      b.style.transform  = 'translateY(100%)';
      b.style.opacity    = '0';
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 320);
    }
  }

  /* ── 5. Javna funkcija za reset pristanka (iz Privacy page) ─── */
  window.tmResetConsent = function () {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };

})();
