(function () {
  'use strict';

  var STORAGE_KEY = 'adrar-theme';
  var root = document.documentElement;

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0a0a0d' : '#c46a35';
  }

  apply(getPreferred());

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(e.matches ? 'dark' : 'light');
    }
    updateIcons();
  });

  function updateIcons() {
    var theme = root.getAttribute('data-theme');
    var icons = document.querySelectorAll('.theme-toggle-icon');
    icons.forEach(function (icon) {
      var isDark = theme === 'dark';
      icon.querySelector('.icon-moon').style.display = isDark ? 'none' : 'block';
      icon.querySelector('.icon-sun').style.display = isDark ? 'block' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateIcons();

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.theme-toggle');
      if (!btn) return;
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      updateIcons();
    });
  });
})();
