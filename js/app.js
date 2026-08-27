(function () {
  'use strict';

  var IMAGES = [
    'img/001.webp',
    'img/002.webp',
    'img/003.webp',
    'img/004.webp',
    'img/005.webp',
  ];

  var demo = initBurnsEffect('#demo', {
    images: IMAGES,
    delay: 5000,
    transition: 1500,
    zoom: 10000,
    timer: true,
  });

  initBurnsEffect('#demo-2', {
    images: IMAGES,
    delay: 4000,
    transition: 2200,
    zoom: 6000,
    timer: true,
  });

  var fields = {
    delay: document.getElementById('opt-delay'),
    transition: document.getElementById('opt-transition'),
    zoom: document.getElementById('opt-zoom'),
    timer: document.getElementById('opt-timer'),
    images: document.getElementById('opt-images'),
  };

  var output = document.getElementById('output');
  var btnApply = document.getElementById('btn-apply');
  var btnCopy = document.getElementById('btn-copy');

  function readImages() {
    return fields.images.value
      .split('\n')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function buildOptions() {
    return {
      images: readImages(),
      delay: parseInt(fields.delay.value, 10) || 5000,
      transition: parseInt(fields.transition.value, 10) || 1500,
      zoom: parseInt(fields.zoom.value, 10) || 10000,
      timer: fields.timer.checked,
    };
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function generateSnippet(opts) {
    var imagesLiteral = opts.images
      .map(function (src) { return '      <span class="tok-val">"' + escHtml(src) + '"</span>'; })
      .join('\n');

    return [
      '<span class="tok-sel">&lt;div</span> <span class="tok-prop">id</span>=<span class="tok-val">"burns"</span> <span class="tok-prop">class</span>=<span class="tok-val">"burns"</span> <span class="tok-prop">style</span>=<span class="tok-val">"height:60vh"</span><span class="tok-sel">&gt;</span>&lt;/div&gt;',
      '',
      '<span class="tok-sel">&lt;link</span> <span class="tok-prop">rel</span>=<span class="tok-val">"stylesheet"</span> <span class="tok-prop">href</span>=<span class="tok-val">"css/burns-effect.css?v=2"</span><span class="tok-sel">&gt;</span>',
      '<span class="tok-sel">&lt;script</span> <span class="tok-prop">src</span>=<span class="tok-val">"js/burns-effect.js?v=2"</span><span class="tok-sel">&gt;</span>&lt;/script&gt;',
      '<span class="tok-sel">&lt;script&gt;</span>',
      '  <span class="tok-sel">initBurnsEffect</span>(<span class="tok-val">\'#burns\'</span>, {',
      '    <span class="tok-prop">images</span>: [',
      imagesLiteral,
      '    ],',
      '    <span class="tok-prop">delay</span>: ' + opts.delay + ',',
      '    <span class="tok-prop">transition</span>: ' + opts.transition + ',',
      '    <span class="tok-prop">zoom</span>: ' + opts.zoom + ',',
      '    <span class="tok-prop">timer</span>: ' + opts.timer + ',',
      '  });',
      '<span class="tok-sel">&lt;/script&gt;</span>',
    ].join('\n');
  }

  function apply() {
    var opts = buildOptions();
    if (demo) demo.destroy();
    demo = initBurnsEffect('#demo', opts);
    output.querySelector('code').innerHTML = generateSnippet(opts);
  }

  btnApply.addEventListener('click', apply);
  btnCopy.addEventListener('click', function () {
    var text = output.querySelector('code').textContent;
    navigator.clipboard.writeText(text).then(function () {
      btnCopy.textContent = '¡Copiado!';
      setTimeout(function () { btnCopy.textContent = 'Copiar código'; }, 1500);
    });
  });

  apply();
})();
