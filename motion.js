/* ============================================================
   ALCHEMYSTICAL — motion (scroll reveals + header only)
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveals (scroll-position based; robust everywhere) ---- */
  function wireReveals() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    // Reduced motion: show everything immediately, no animation.
    if (reduce) {
      els.forEach(function (e) { e.style.transition = 'none'; e.classList.add('in'); });
      return;
    }

    var pending = els;
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var still = [];
      for (var i = 0; i < pending.length; i++) {
        var el = pending[i];
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
        else still.push(el);
      }
      pending = still;
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; check(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    check();
    // safety net: reveal anything still hidden after a few seconds
    setTimeout(function () { pending.forEach(function (e) { e.classList.add('in'); }); }, 4000);
  }

  /* ---- header stuck ---- */
  function wireHeader() {
    var head = document.getElementById('head');
    if (!head) return;
    var onScroll = function () {
      if (window.scrollY > 40) head.classList.add('stuck');
      else head.classList.remove('stuck');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    wireHeader();
    wireReveals();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // expose for Tweaks (reveal preference)
  window.__alch = { setReduce: function (v) { reduce = v; } };
})();
