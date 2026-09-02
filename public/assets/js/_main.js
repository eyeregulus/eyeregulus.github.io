/* ==========================================================================
   Main
   ========================================================================== */

(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if (
      !checkbox.checked ||
      sidebar.contains(target) ||
      (target === checkbox || target === toggle)
    ) {
      return;
    }

    checkbox.checked = false;
  }, false);

  // Language switcher logic
  var langSwitcher = document.getElementById('language-switcher');
  if (langSwitcher) {
    var langFlag = document.getElementById('language-flag');
    var currentLang = 'ko';

    langSwitcher.addEventListener('click', function() {
      if (currentLang === 'ko') {
        langFlag.textContent = '🇺🇸';
        currentLang = 'en';
      } else {
        langFlag.textContent = '🇰🇷';
        currentLang = 'ko';
      }
    });
  }
})(document);


/* ==========================================================================
   Search
   ========================================================================== */

(function(document) {
  var search = document.querySelector('.search');
  var searchToggle = document.querySelector('.search__toggle');

  if (!search || !searchToggle) {
    return;
  }

  var searchInput = document.querySelector('#search');
  var results = document.querySelector('#results');
  var initialContent = document.querySelector('.initial-content');
  var main = document.querySelector('.main');
  var footer = document.querySelector('.page__footer');
  var isVisible = false;

  function open() {
    search.classList.add('is--visible');
    main.classList.add('is--hidden');

    if (initialContent) {
      initialContent.classList.add('is--hidden');
    }

    if (footer) {
      footer.classList.add('is--hidden');
    }

    setTimeout(function() {
      searchInput.focus();
    }, 400);

    document.addEventListener('keydown', onKeydown);
    isVisible = true;
  }

  function close() {
    document.removeEventListener('keydown', onKeydown);
    search.classList.remove('is--visible');
    main.classList.remove('is--hidden');

    if (initialContent) {
      initialContent.classList.remove('is--hidden');
    }

    if (footer) {
      footer.classList.remove('is--hidden');
    }

    if (results) {
      results.innerHTML = '';
    }

    isVisible = false;
  }

  function onKeydown(e) {
    switch (e.key) {
      case 'Escape':
        close();
        break;
    }
  }

  searchToggle.addEventListener('click', function() {
    if (isVisible) {
      close();
    } else {
      open();
    }
  });
})(document);
