/* Mantua Pet Nutrition — shared enhancement script (progressive; site works without it) */
(function () {
  document.documentElement.classList.add('js');

  // Hero slow zoom trigger
  window.addEventListener('load', function () {
    var hero = document.querySelector('.hero');
    if (hero) hero.classList.add('loaded');
  });

  // Sticky nav shadow
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Self-drawing paw print at the top of the consult band
  var band = document.querySelector('.consult-band');
  if (band) {
    band.insertAdjacentHTML(
      'afterbegin',
      '<svg class="pawdraw" viewBox="0 0 86 62" aria-hidden="true">' +
        '<path d="M16.6 29.5 a6 8 -25 1 0 10.9 -5.1 a6 8 -25 1 0 -10.9 5.1"/>' +
        '<path d="M28.6 10.9 a6.5 9 10 1 0 12.8 2.3 a6.5 9 10 1 0 -12.8 -2.3"/>' +
        '<path d="M44.6 13.1 a6.5 9 -10 1 0 12.8 -2.3 a6.5 9 -10 1 0 -12.8 2.3"/>' +
        '<path d="M58.6 24.5 a6 8 25 1 0 10.9 5.1 a6 8 25 1 0 -10.9 -5.1"/>' +
        '<path d="M43 28 C37 28 32 31 30 35 C26 39 24 44 25 49 C26 54 30 58 35 58 C39 58 41 55 43 52 C45 55 47 58 51 58 C56 58 60 54 61 49 C62 44 60 39 56 35 C54 31 49 28 43 28 Z" pathLength="100"/>' +
      '</svg>'
    );
    band.querySelectorAll('.pawdraw path').forEach(function (p) {
      if (!p.hasAttribute('pathLength')) p.setAttribute('pathLength', '100');
    });
    window.addEventListener('load', function () {
      var paw = band.querySelector('.pawdraw');
      if (paw) paw.classList.add('in');
    });
  }

  // Scroll reveal: tag common blocks, then observe
  var targets = document.querySelectorAll(
    '.grid > *, main h2, .sub, .intro, .faq details, .consult-band .badge, .consult-band h2, .consult-band p, .consult-band .row'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Mobile sticky call bar
  var bar = document.createElement('div');
  bar.className = 'callbar';
  bar.innerHTML =
    '<a class="call" href="tel:+18564944290"><span class="ph">📞</span> Call 856-494-4290</a>' +
    '<a class="consult" href="/holistic-pet-food-expert/">Free Consult</a>';
  document.body.appendChild(bar);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { bar.classList.add('show'); });
  });
})();
