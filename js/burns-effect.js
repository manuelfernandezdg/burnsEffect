(function (global) {
  'use strict';

  var DEFAULTS = {
    images: [],
    delay: 5000,
    transition: 1500,
    zoom: 10000,
    timer: true,
  };

  var DIRECTIONS = [
    'burns-slide--pan-a',
    'burns-slide--pan-b',
    'burns-slide--pan-c',
    'burns-slide--pan-d',
  ];

  function createSlide(src, index) {
    var slide = document.createElement('div');
    slide.className = 'burns-slide ' + DIRECTIONS[index % DIRECTIONS.length];
    slide.style.backgroundImage = 'url("' + src + '")';
    return slide;
  }

  function initBurnsEffect(target, options) {
    var opts = Object.assign({}, DEFAULTS, options || {});
    var container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) return null;

    container.classList.add('burns');
    container.style.setProperty('--slider-transicion', opts.transition + 'ms');
    container.style.setProperty('--slider-zoom', opts.zoom + 'ms');

    var slides = opts.images.map(function (src, i) {
      var slide = createSlide(src, i);
      var img = new Image();
      img.src = src;
      container.appendChild(slide);
      return slide;
    });

    if (slides.length === 0) return null;

    var timer = null;
    var bar = null;
    if (opts.timer) {
      timer = document.createElement('div');
      timer.className = 'burns-timer';
      timer.innerHTML = '<span class="burns-timer__bar"></span>';
      container.appendChild(timer);
      bar = timer.firstElementChild;
    }

    var index = 0;
    var intervalId = null;

    function restartTimer() {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth;
      bar.style.transition = 'width ' + opts.delay + 'ms linear';
      bar.style.width = '100%';
    }

    function next() {
      slides[index].classList.remove('burns-slide--active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('burns-slide--active');
      restartTimer();
    }

    function start() {
      slides[index].classList.add('burns-slide--active');
      restartTimer();
      intervalId = setInterval(next, opts.delay);
    }

    function stop() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else if (slides.length && !intervalId) start();
    }

    document.addEventListener('visibilitychange', onVisibility);

    start();

    return {
      next: next,
      destroy: function () {
        stop();
        document.removeEventListener('visibilitychange', onVisibility);
        container.innerHTML = '';
        container.classList.remove('burns');
      },
    };
  }

  global.initBurnsEffect = initBurnsEffect;
})(window);
