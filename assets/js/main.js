/**
* Template Name: OnePage
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Isotope disabled: portfolio now uses a simple responsive grid without filtering.
   */

  /**
   * Protocol icons: inject logos from local assets into .protocol-card .protocol-icon
   * Avoids external CDNs. Falls back to badge if logo fails.
   */
  function initProtocolIcons() {
    const cards = document.querySelectorAll('.protocol-card');
    if (!cards.length) return;

    const logoFile = {
      BTC: 'btc.svg',
      ETH: 'eth.svg',
      POL: 'pol.svg',
      BNB: 'bnb.svg',
      TRX: 'trx.svg',
      SOL: 'sol.svg',
      AVAX: 'avax.svg',
      ARB: 'arb.svg',
      OP: 'op.svg',
      BASE: 'base.svg',
      ZK: 'zk.svg',
      STRK: 'strk.svg',
      XRP: 'xrp.svg',
      XLM: 'xlm.svg',
      LTC: 'ltc.svg',
      BCH: 'bch.svg',
      ADA: 'ada.svg',
      DOT: 'dot.svg',
      XTZ: 'xtz.svg',
      ALGO: 'algo.svg',
      NEAR: 'near.svg',
      ATOM: 'atom.svg'
    };

    cards.forEach(card => {
      const iconBox = card.querySelector('.protocol-icon');
      if (!iconBox) return;
      const badgeEl = iconBox.querySelector('.protocol-badge');
      const symbol = badgeEl ? badgeEl.textContent.trim().toUpperCase() : null;
      if (!symbol || !logoFile[symbol]) return;

      const file = logoFile[symbol];
      const img = new Image();
      img.className = 'protocol-logo';
      const name = card.querySelector('.protocol-name')?.textContent?.trim() || symbol;
      img.alt = name + ' logo';
      img.src = `assets/img/protocols/${file}`;

      img.onerror = () => {
        // Fallback to badge on failure
        if (!iconBox.querySelector('.protocol-badge') && badgeEl) {
          iconBox.innerHTML = '';
          iconBox.appendChild(badgeEl);
        }
      };

      img.onload = () => {
        iconBox.innerHTML = '';
        iconBox.appendChild(img);
      };
    });
  }

  window.addEventListener('load', initProtocolIcons);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Copy email to clipboard with feedback
   */
  document.querySelectorAll('.copy-email').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy');
      const icon = btn.querySelector('i');
      const textSpan = btn.querySelector('span');

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (e) { /* no-op, fallback below */ }
      }

      if (!copied) {
        try {
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copied = true;
        } catch (e) { /* ignore */ }
      }

      if (copied) {
        const oldText = textSpan ? textSpan.textContent : '';
        const oldIcon = icon ? icon.className : '';
        btn.disabled = true;
        if (icon) icon.className = 'bi bi-clipboard-check';
        if (textSpan) textSpan.textContent = 'Copied!';
        setTimeout(() => {
          if (icon) icon.className = oldIcon || 'bi bi-clipboard';
          if (textSpan) textSpan.textContent = oldText || 'Copy';
          btn.disabled = false;
        }, 1500);
      }
    });
  });

})();