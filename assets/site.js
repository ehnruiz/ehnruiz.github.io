(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  function current() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  if (toggle) {
    toggle.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');
    toggle.addEventListener('click', function () { apply(current() === 'dark' ? 'light' : 'dark'); });
  }

  // Contents: one entry per h2 in the essay, built from the headings so the Markdown stays plain.
  var nav = document.querySelector('.contents');
  var prose = document.querySelector('.prose');
  if (nav && prose) {
    var heads = prose.querySelectorAll('h2');
    if (heads.length >= 3) {
      var ol = nav.querySelector('ol');
      heads.forEach(function (h, i) {
        if (!h.id) h.id = 'section-' + (i + 1);
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
      });
      nav.hidden = false;
      var links = ol.querySelectorAll('a');
      if ('IntersectionObserver' in window) {
        var active = null;
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              if (active) active.classList.remove('active');
              active = ol.querySelector('a[href="#' + e.target.id + '"]');
              if (active) active.classList.add('active');
            }
          });
        }, { rootMargin: '0px 0px -70% 0px' });
        heads.forEach(function (h) { obs.observe(h); });
      }
    }
  }
})();
