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
  var PALETTES = ['cream', 'sky', 'mustard', 'teal', 'rose', 'ink'];
  var STORAGE_KEY = 'bouksi-palette';

  function applyPalette(name) {
    document.documentElement.setAttribute('data-palette', name);
    var buttons = document.querySelectorAll('.palette-switcher button');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.palette === name ? 'true' : 'false');
    });
  }

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
      title: "Poseidon's Island",
      summary: 'A 20-minute 3D animation produced for Vmuseum Corfu.',
      cover: 'assets/images/poseidons-island/cover.jpg',
      url: 'projects/poseidons-island.html'
    },
    {
      title: 'Komprai',
      summary: 'A single continuous-take music video shot on a 360 camera in Mavromichali, Athens.',
      cover: 'assets/images/komprai/cover.jpg',
      url: 'projects/komprai.html'
    },
    {
      title: 'Ermafa',
      summary: 'A real-time touchscreen table installation visualizing industrial recycling machines.',
      cover: 'assets/images/ermafa/cover.jpg',
      url: 'projects/ermafa.html'
    },
    {
      title: 'VHF',
      summary: 'An interactive touchscreen installation letting visitors plan energy scenarios for 2050.',
      cover: 'assets/images/vhf/cover.jpg',
      url: 'projects/vhf.html'
    },
    {
      title: 'AI Drawer',
      summary: 'An AI-driven touchscreen brand experience generating imagery in real time.',
      cover: 'assets/images/ai-drawer/cover.jpg',
      url: 'projects/ai-drawer.html'
    },
    {
      title: 'Edition of One',
      summary: 'An AI-driven installation generating a unique, one-of-a-kind poster for each visitor.',
      cover: 'assets/images/edition-of-one/cover.jpg',
      url: 'projects/edition-of-one.html'
    },
    {
      title: 'Athens by Sound',
      summary: 'An immersive sound installation with hanging headphone listening stations.',
      cover: 'assets/images/athens-by-sound/02.jpg',
      url: 'projects/athens-by-sound.html'
    },
    {
      title: 'Germanos',
      summary: 'A real-time 3D character animation loop for an interactive brand experience.',
      cover: 'assets/images/germanos/cover.jpg',
      url: 'projects/germanos.html'
    },
    {
      title: 'Memory Cinema',
      summary: 'A generative visualization built from captured movement data.',
      cover: 'assets/images/memory-cinema/cover.jpg',
      url: 'projects/memory-cinema.html'
    },
    {
      title: 'Narcos',
      summary: 'An immersive, Narcos-branded interactive experience combining set design with a treadmill game.',
      cover: 'assets/images/narcos/cover.jpg',
      url: 'projects/narcos.html'
    },
    {
      title: 'Siemens',
      summary: 'A projection-mapping installation using illuminated geometry and animated visuals.',
      cover: 'assets/images/siemens/cover.jpg',
      url: 'projects/siemens.html'
    },
    {
      title: 'TTT',
      summary: 'A motion-tracked table tennis game with real-time player analytics.',
      cover: 'assets/images/ttt/cover.jpg',
      url: 'projects/ttt.html'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var nextBtn = document.getElementById('featured-next');
    if (!nextBtn) return;

    var index = 0;

    function render() {
      var project = FEATURED_PROJECTS[index];
      document.getElementById('featured-image').src = project.cover;
      document.getElementById('featured-image').alt = 'Still from ' + project.title;
      document.getElementById('featured-title').textContent = project.title;
      document.getElementById('featured-summary').textContent = project.summary;
      document.getElementById('featured-link').href = project.url;
    }

    nextBtn.addEventListener('click', function () {
      index = (index + 1) % FEATURED_PROJECTS.length;
      render();
    });
  });
})();

// Category filter — works.html grid. Toggles .project-card visibility
// by matching data-category against the pressed filter button.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var filter = document.querySelector('.category-filter');
    var grid = document.querySelector('.project-grid');
    if (!filter || !grid) return;

    var cards = grid.querySelectorAll('.project-card');

    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-category]');
      if (!btn) return;

      filter.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
      });
      btn.setAttribute('aria-pressed', 'true');

      var category = btn.dataset.category;
      cards.forEach(function (card) {
        var show = category === 'all' || card.dataset.category === category;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
