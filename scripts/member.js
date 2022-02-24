var amount = 1;
const price = 6969;

// const condition; //add true | munus false
const addbut = document.getElementById('add');
const subtractbut = document.getElementById('subtract');
const amountDiv = document.getElementById('dis-amount');

const add = () => {
  console.log('add');
  amount += 1;
  show();
};
const subtract = () => {
  if (amount > 1) {
    console.log('sub');
    amount -= 1;
    show();
  }
};

const show = () => {
  amountDiv.innerHTML = JSON.stringify(amount);
};

addbut.addEventListener('click', add);
subtractbut.addEventListener('click', subtract);
// export const fuck1 = new member();

// Force back to top when refresh
history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
