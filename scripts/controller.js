'strict mode';

//////////////////////////////////////////////////

/*    > Web Cumtomization <    */

//////////////////////////////////////////////////
const body = document.querySelector('body');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const sectionHeroEl = document.querySelector('.section-hero');
const navHeight = header.getBoundingClientRect().height;
const faqItem = document.querySelectorAll('.item');

// Sticky Nav
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) body.classList.add('sticky');
  else body.classList.remove('sticky');
};

const obs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

obs.observe(sectionHeroEl);

// Reveal Section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Force back to top when refresh
history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

// Scroll to top
const logo = document.querySelector('.logo-text');

logo.addEventListener('click', function (e) {
  e.preventDefault();
  const href = logo.getAttribute('href');

  // Scroll back to top
  if (href === '#')
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
});

// Open FAQ
const openAccordion = function (e) {
  const clicked = e.target.closest('.item');

  if (!clicked.classList.contains('open')) {
    faqItem.forEach((item) => {
      item.classList.remove('open');
      item.classList.remove('hidden');
    });

    clicked.classList.add('open');
  } else {
    clicked.classList.remove('open');
    clicked.classList.add('hidden');
  }
};

faqItem.forEach((item) => {
  item.classList.remove('open');
});

faqItem.forEach((item) => {
  item.addEventListener('click', openAccordion);
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/*    > Metamask Function <    */

//////////////////////////////////////////////////
