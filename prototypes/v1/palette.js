/* Unknown Foundation — palette switcher. Persists choice; degrades to default on file:// */
(function () {
  var html = document.documentElement, KEY = 'uf-palette', DEFAULT = 'amber';
  var saved = DEFAULT;
  try { saved = localStorage.getItem(KEY) || DEFAULT; } catch (e) {}
  html.setAttribute('data-palette', saved);

  function bind() {
    var btns = document.querySelectorAll('.palette-switch [data-p]');
    function mark(active) {
      btns.forEach(function (x) {
        var on = x === active;
        x.classList.toggle('active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    var current = null;
    btns.forEach(function (b) {
      if (b.dataset.p === html.getAttribute('data-palette')) current = b;
      b.addEventListener('click', function () {
        html.setAttribute('data-palette', b.dataset.p);
        try { localStorage.setItem(KEY, b.dataset.p); } catch (e) {}
        mark(b);
      });
    });
    mark(current || btns[0]);
  }
  if (document.readyState !== 'loading') bind();
  else document.addEventListener('DOMContentLoaded', bind);
})();
