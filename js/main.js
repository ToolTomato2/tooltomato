// =========================================================
// TOOLTOMATO — shared site script
// Handles: mobile nav toggle, cookie consent banner, homepage tool search
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ---- Cookie consent banner ----
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  var CONSENT_KEY = 'tooltomato_cookie_consent';

  if (banner) {
    var existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) {
      banner.style.display = 'flex';
    }
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        banner.style.display = 'none';
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'declined');
        banner.style.display = 'none';
      });
    }
  }

  // ---- Homepage / tool search filter ----
  // Works against elements with class "card" that carry a data-name attribute.
  var searchInput = document.getElementById('tool-search-input');
  var noResults = document.querySelector('.no-results');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      var cards = document.querySelectorAll('[data-tool-card]');
      var visibleCount = 0;
      cards.forEach(function (card) {
        var name = (card.getAttribute('data-name') || '').toLowerCase();
        var match = name.indexOf(q) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      if (noResults) {
        noResults.style.display = (visibleCount === 0 && q !== '') ? 'block' : 'none';
      }
    });

    // Prevent full page reload on Enter inside the search box
    var searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    }
  }

});
