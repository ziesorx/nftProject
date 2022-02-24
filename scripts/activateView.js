import { tokenCheck } from './Meta/tokencheck.js';

const btnConnect = document.querySelector('#connect-meta');

btnConnect.addEventListener('click', tokenCheck.initialize);
window.addEventListener('load', tokenCheck.initialize);

// Force back to top when refresh
history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
