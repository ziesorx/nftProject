import { tokenCheck, checkNFT } from "./Meta/tokencheck.js";
const btnConnect = document.querySelector("#connect-meta");
// import { tokenHolders } from "./Token Holders/holders.js";

// console.log();
//Check if the wallet has already activated
// var account = await ethereum.request({ method: "eth_accounts" });
// account = account[0];
// const url = "http://localhost:3000/api";
// const check = {
//   method: "GET",
//   withCredentials: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// };
// var pass = false;

// const data = await fetch(url + `/verified/${account}`, check);

// console.log(data.status);
// if (data.status != 200) {
//   pass = true;
//   tokenCheck.initialize();
// }

btnConnect.addEventListener("click", tokenCheck.initialize);

window.addEventListener("load", tokenCheck.initialize);

// Force back to top when refresh
history.scrollRestoration = "manual";
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
