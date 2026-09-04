// Logo cursor blink — toggles the underscore in "[bouksi_]" every 500ms.
(function () {
  var cursor = document.querySelector('.site-logo .blink');
  if (!cursor) return;
  setInterval(function () {
    cursor.textContent = cursor.textContent === '_' ? '' : '_';
  }, 500);
})();

// Palette switcher — persists choice in localStorage, applies before paint
// via an inline script in <head> to avoid a flash of the wrong palette.
(function () {
  var PALETTES = ['cream', 'sky', 'mustard', 'teal', 'rose', 'ink', 'plum'];
  var STORAGE_KEY = 'bouksi-palette';

  function applyPalette(name) {
    document.documentElement.setAttribute('data-palette', name);
    var buttons = document.querySelectorAll('.palette-switcher button');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.palette === name ? 'true' : 'false');
    });
  }

  // exposed so the category filter (below) can preview a theme without
  // writing to localStorage — that persistence stays tied to this switcher
  window.bouksiApplyPalette = applyPalette;

  document.addEventListener('DOMContentLoaded', function () {
    var current = document.documentElement.getAttribute('data-palette') || 'cream';
    applyPalette(current);

    var switcher = document.querySelector('.palette-switcher');
    if (!switcher) return;

    switcher.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-palette]');
      if (!btn) return;
      var name = btn.dataset.palette;
      if (PALETTES.indexOf(name) === -1) return;
      localStorage.setItem(STORAGE_KEY, name);
      applyPalette(name);
    });
  });
})();

// Featured project cycler — index.html hero. Clicking "Next" advances
// through FEATURED_PROJECTS and re-renders the card in place.
(function () {
  var FEATURED_PROJECTS = [
    {
      title: 'Edition of One',
      summary: "An installation with an intelligence creating posters for the exhibition's visitors.",
      cover: 'assets/images/01-edition-of-one/cover.jpg',
      url: 'projects/01-edition-of-one.html'
    },
    {
      title: "Poseidon's Island",
      summary: 'A short, stereoscopic 3D animation movie about the history of Corfu.',
      cover: 'assets/images/02-poseidons-island/cover.jpg',
      url: 'projects/02-poseidons-island.html'
    },
    {
      title: 'Potential Drawer',
      summary: "An AI drawing tool, creating real-time interiors from visitors' drawings.",
      cover: 'assets/images/03-potential-drawer/cover.jpg',
      url: 'projects/03-potential-drawer.html'
    },
    {
      title: 'Verkehrshaus',
      summary: 'A multiplayer energy-planning game that puts visitors in the seat of a power plant manager, trading resources across borders.',
      cover: 'assets/images/04-verkehrshaus/cover.jpg',
      url: 'projects/04-verkehrshaus.html'
    },
    {
      title: 'Siemens Markenfilm',
      summary: 'Dynamic 3D mapping on stage for film, with realtime generated visuals.',
      cover: 'assets/images/06-siemens-markenfilm/cover.jpg',
      url: 'projects/06-siemens-markenfilm.html'
    },
    {
      title: 'Kalliplokamos',
      summary: 'Generative sculpture made from steel, chicken wire, PVC tubing, UV lights, fluid circulation machinery, and a category C truck.',
      cover: 'assets/images/07-kalliplokamos/cover.jpg',
      url: 'projects/07-kalliplokamos.html'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var nextBtn = document.getElementById('featured-next');
    if (!nextBtn) return;

    var rule = document.getElementById('featured-rule');
    var wave = rule ? rule.querySelector('.featured-rule-wave') : null;

    var index = 0;

    function render() {
      var project = FEATURED_PROJECTS[index];
      document.getElementById('featured-image').src = project.cover;
      document.getElementById('featured-image').alt = 'Still from ' + project.title;
      document.getElementById('featured-title').textContent = project.title;
      document.getElementById('featured-summary').textContent = project.summary;
      document.getElementById('featured-link').href = project.url;
    }

    function pickRandomIndex() {
      if (FEATURED_PROJECTS.length < 2) return index;
      var next;
      do {
        next = Math.floor(Math.random() * FEATURED_PROJECTS.length);
      } while (next === index);
      return next;
    }

    function restartWave() {
      if (!wave) return;
      wave.style.animation = 'none';
      void wave.offsetWidth; // force reflow so the animation restarts from 0%
      wave.style.animation = '';
    }

    nextBtn.addEventListener('click', function () {
      index = pickRandomIndex();
      render();
      restartWave();
    });

    // the travelling wave in the dashed rule above the image doubles as an
    // auto-advance timer: each time it finishes one pass, swap in a new
    // random project. Respects prefers-reduced-motion — no animation means
    // no iteration event, so it never auto-advances there; "Next" still
    // works manually regardless.
    if (wave) {
      wave.addEventListener('animationiteration', function () {
        index = pickRandomIndex();
        render();
      });
    }
  });
})();

// Category + keyword filters — works.html grid.
//
// Both rows are single-select (click the active button again to clear it),
// and the two rows are mutually exclusive: picking a category clears any
// active keyword, and picking a keyword clears any active category (and
// its theme preview). Only one filter is ever in effect at a time.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var categoryFilter = document.querySelector('.category-filter');
    var keywordFilter = document.querySelector('.keyword-filter');
    var grid = document.querySelector('.project-grid');
    if (!grid || (!categoryFilter && !keywordFilter)) return;

    var cards = grid.querySelectorAll('.project-card');
    var activeCategory = null;
    var activeKeyword = null;

    // Each category's fill — and the theme it previews when selected — is
    // deliberately one of the site's own named palettes (see [data-palette]
    // in style.css): Immersive=Sky, Animation=Mustard, Games=Rose,
    // Installations=Teal, Music=Ink, Various=Cream.
    var categoryPaletteNames = {
      immersive: 'Sky',
      animation: 'Mustard',
      games: 'Rose',
      installations: 'Teal',
      music: 'Ink',
      various: 'Cream'
    };

    // Each category's own waveform (see the SVG traces above), rendered as
    // an actual tone: a short blip that fades in, then out, over the same
    // 0.4s window as the colour crossfade in style.css — keep these in
    // sync if that duration ever changes.
    var THEME_TRANSITION_S = 0.4;
    var categoryTones = {
      immersive: { type: 'sine', freq: 330 },
      animation: { type: 'triangle', freq: 392 },
      games: { type: 'square', freq: 293.66 },        // A4 down a fifth — D4
      installations: { type: 'square', freq: 329.63 }, // B4 down a fifth — E4
      music: { type: 'sawtooth', freq: 587 },
      various: { type: 'noise' }
    };
    var audioCtx = null;

    var MUTE_STORAGE_KEY = 'bouksi-muted';
    var muteToggle = document.getElementById('mute-toggle');
    var muted = localStorage.getItem(MUTE_STORAGE_KEY) === 'true';

    function applyMuteButton() {
      if (!muteToggle) return;
      muteToggle.setAttribute('aria-pressed', muted ? 'true' : 'false');
      muteToggle.textContent = muted ? '🔇 Muted' : '🔊 Sound';
    }
    applyMuteButton();

    if (muteToggle) {
      muteToggle.addEventListener('click', function () {
        muted = !muted;
        localStorage.setItem(MUTE_STORAGE_KEY, muted);
        applyMuteButton();
      });
    }

    function playCategoryTone(category) {
      if (muted) return;
      var wave = categoryTones[category];
      if (!wave) return;
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      var now = audioCtx.currentTime;
      var attack = THEME_TRANSITION_S * 0.25;

      var gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.06, now + attack);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + THEME_TRANSITION_S);
      gainNode.connect(audioCtx.destination);

      // lowpass, sweeping shut over the same window — takes the buzz off
      // the square/sawtooth/noise tones and gives everything a soft
      // "closing" pluck instead of an abrupt cutoff
      var filterNode = audioCtx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.Q.value = 0.7;
      var openCutoff = wave.type === 'noise' ? 4000 : Math.min(wave.freq * 8, 6000);
      var closeCutoff = wave.type === 'noise' ? 500 : Math.max(wave.freq * 1.5, 300);
      filterNode.frequency.setValueAtTime(openCutoff, now);
      filterNode.frequency.exponentialRampToValueAtTime(closeCutoff, now + THEME_TRANSITION_S);
      filterNode.connect(gainNode);

      var source;
      if (wave.type === 'noise') {
        var bufferSize = Math.ceil(audioCtx.sampleRate * THEME_TRANSITION_S);
        var buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        source = audioCtx.createBufferSource();
        source.buffer = buffer;
      } else {
        source = audioCtx.createOscillator();
        source.type = wave.type;
        source.frequency.value = wave.freq;
      }

      source.connect(filterNode);
      source.start(now);
      source.stop(now + THEME_TRANSITION_S);
    }

    function render() {
      cards.forEach(function (card) {
        var show;
        if (activeKeyword) {
          var cardKeywords = (card.dataset.keywords || '').split(' ');
          show = cardKeywords.indexOf(activeKeyword) !== -1;
        } else {
          var cardCategories = card.dataset.category.split(' ');
          show = !activeCategory || cardCategories.indexOf(activeCategory) !== -1;
        }
        card.style.display = show ? '' : 'none';
      });
    }

    function clearKeyword() {
      if (!activeKeyword) return;
      activeKeyword = null;
      if (keywordFilter) {
        keywordFilter.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });
      }
    }

    function clearCategory() {
      if (!activeCategory) return;
      activeCategory = null;
      if (categoryFilter) {
        categoryFilter.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });
      }
      if (window.bouksiApplyPalette) window.bouksiApplyPalette('cream');
    }

    // category and keyword are mutually exclusive — picking one clears
    // the other, so there's only ever one active filter at a time
    if (categoryFilter) {
      categoryFilter.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-category]');
        if (!btn) return;

        var alreadyActive = btn.getAttribute('aria-pressed') === 'true';
        clearKeyword();

        categoryFilter.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });

        if (alreadyActive) {
          // clicking the active category again clears it — show everything
          // and drop the theme preview back to the default
          activeCategory = null;
          if (window.bouksiApplyPalette) window.bouksiApplyPalette('cream');
        } else {
          btn.setAttribute('aria-pressed', 'true');
          activeCategory = btn.dataset.category;
          var paletteName = categoryPaletteNames[activeCategory];
          if (paletteName && window.bouksiApplyPalette) {
            window.bouksiApplyPalette(paletteName.toLowerCase());
          }
          playCategoryTone(activeCategory);
        }
        render();
      });
    }

    if (keywordFilter) {
      keywordFilter.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-keyword]');
        if (!btn) return;

        var alreadyActive = btn.getAttribute('aria-pressed') === 'true';
        clearCategory();

        keywordFilter.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });

        if (alreadyActive) {
          activeKeyword = null;
        } else {
          btn.setAttribute('aria-pressed', 'true');
          activeKeyword = btn.dataset.keyword;
        }
        render();
      });
    }
  });
})();

// Gallery video mute toggle — each clip autoplays muted; the overlay
// button lets a visitor turn its sound on without leaving the grid.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.gallery-grid .mute-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var video = btn.previousElementSibling;
        if (!video) return;
        video.muted = !video.muted;
        btn.textContent = video.muted ? '🔇' : '🔊';
        btn.setAttribute('aria-pressed', video.muted ? 'false' : 'true');
        btn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
      });
    });
  });
})();
