var amount = 1;
var price = 0.004;

// const condition; //add true | munus false
const addbut = document.getElementById('add');
const subtractbut = document.getElementById('subtract');
const amountDiv = document.getElementById('dis-amount');
const totalCost = document.getElementById('total-amount');
const maxBtn = document.querySelector('.btn--max');
const keyVid = document.querySelector('.key-vid');
const sectionMint = document.querySelector('.mint');
const vidContainer = document.querySelector('.figure-vid-container');

keyVid.playbackRate = 0.75;
vidContainer.addEventListener('mouseenter', function (e) {
  vidContainer.addEventListener('mousemove', function (e) {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 10;
    vidContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
});

vidContainer.addEventListener('mouseleave', function (e) {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 10;
  vidContainer.style.transform = `rotateY(${-xAxis}deg) rotateX(${-yAxis}deg)`;
});

const add = () => {
  if (amount < 5) {
    amount += 1;
    price += 0.004;
    show();
  }
};

const subtract = () => {
  if (amount > 1) {
    amount -= 1;
    price -= 0.004;
    show();
  }
};

const max = () => {
  amount = 5;
  price = 5 * 0.004;
  show();
};

const show = () => {
  amountDiv.innerHTML = JSON.stringify(amount);
  totalCost.innerHTML = JSON.stringify(price);
};

addbut.addEventListener('click', add);
subtractbut.addEventListener('click', subtract);
maxBtn.addEventListener('click', max);

// Force back to top when refresh
history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
