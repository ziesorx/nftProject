//if not connected -> button connect -> sign right away ->feedback
//if connected -> pop sign right away -> feedback
"strict mode";
import { tokenHolders } from "/scripts/TokenHolders/holders.js";

class TokenCheck {
  // forwarderOrigin = 'http://localhost:9010';

  // onboarding = new MetaMaskOnboarding({ forwarderOrigin }); // back to metamask.io

  initialize = () => {
    const data = [];
    const connectMeta = document.getElementById("connect-meta");
    const metaLogo = document.querySelector(".logo-meta");
    const metaLogoEl = document.querySelectorAll("meta-hidden");
    let pass = false; // for checking token
    let verified = false; // for already checked or not
    const activateContainer = document.querySelector(
      ".activate-text-container"
    );

    // const isMetaMaskInstalled = () => {
    //   //Have to check the ethereum binding on the window object to see if it's installed
    //   const { ethereum } = window;
    //   return Boolean(ethereum && ethereum.isMetaMask);
    // };

    // const onClickInstall = () => {
    //   onboardButton.innerText = 'Onboarding in progress';
    //   onboardButton.disabled = true;
    //   //On this object we have startOnboarding which will start the onboarding process for our end user
    //   onboarding.startOnboarding();
    // };

    const isMetaMaskConnected = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      return Boolean(accounts && accounts.length > 0);
    };

    const onClickConnect = async () => {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        console.log("g");
        MetaMaskClientCheck();
      } catch (error) {
        console.error(error);
      }
    };

    const sign = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      try {
        const result = await ethereum.request({
          method: "personal_sign",
          params: [accounts[0], "ZieSor hai Meji Fung"],
        });

        return result;
      } catch (err) {
        console.error(err);
      }
    };

    const MetaMaskClientCheck = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const networkId = await ethereum.request({ method: "net_version" });
      const conCheck = await isMetaMaskConnected();

      //Check Install
      // if (!isMetaMaskInstalled()) {
      //   connectMeta.innerText = 'Install MetaMask';
      //   connectMeta.onclick = onClickInstall;
      // }

      //Connected and installed
      if (conCheck) {
        //sign to check
        connectMeta.disabled = true;
        connectMeta.innerHTML = "Connected";
        renderVerified();

        //Not connected but installed
      } else {
        // metaLogo.style.display = 'display';
        // connectMeta.style.display = 'none';
        connectMeta.innerHTML = "Connect";
        connectMeta.addEventListener("click", onClickConnect);
      }
    };
    MetaMaskClientCheck();

    const renderVerified = async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const result = await sign();
      if (result != undefined) {
        const check = await checkHolders(accounts);
        await verify2(accounts);
      }
      // const passResult = pass.json();
      // console.log(passResult);
    };

    const verify2 = async (walletId) => {
      const accounts = walletId;

      //add already activated part

      if (pass) {
        console.log("FOUND");
        activateContainer.innerHTML = "";
        activateContainer.insertAdjacentHTML(
          "afterbegin",
          `
                <p class="address">${accounts[0].slice(
                  0,
                  6
                )}...${accounts[0].slice(-4, accounts[0].length)}</p>
                <h1 class="heading-primary verified-heading">Address verified</h1>
                <p class="final-activate-description">
                  Token found.
                </p>
            `
          // enter email box <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< xxxxxxxxx xxxxxx xxxxxxxx
          // Use newUser api
          // post holdToken true to that user
          // add metamask id using verified api
        );
      } else {
        activateContainer.innerHTML = "";
        activateContainer.insertAdjacentHTML(
          "afterbegin",
          `
                <p class="address">${accounts[0].slice(
                  0,
                  6
                )}...${accounts[0].slice(-4, accounts[0].length)}</p>
                <h1 class="heading-primary verified-heading">Address verified</h1>
                <p class="final-activate-description">
                  But, we couldn't find a subscription matching it.
                </p>
                <a
                  href="./member.html"
                  class="btn btn--full margin-right-sm btn-footer-activate"
                  >Get membership</a
                >
            `
        );
      }
    };

    const checkHolders = async (walletId) => {
      for (let x in tokenHolders) {
        if (tokenHolders[x].toLowerCase() == walletId[0]) {
          pass = true;
          return;
        }
      }
    };

    const checkNFT = async () => {
      const tokenID = [];
      const options = { method: "GET" };
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      const accounts = "0xae310299a52b9b3cd40597a3eb7f/387d97b7c31f";
      let index;
      let check = false;
      // console.log(accounts);

      fetch(
        `https://api.opensea.io/api/v1/assets?owner=${accounts}&limit=50`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          response.assets.forEach((asset) => tokenID.push(asset.token_id));
          index = tokenID.findIndex((id) => id === "0");
          // contractAdrs = tokenID.findIndex(
          //   (adr) => adr === '0x2953399124f0cbb46d2cbacd8a89cf0599974963'
          // );
          if (index === -1) throw new Error("Token is invalid 💥");
          else {
            pass = true;
            check = true;
          }
          // console.log(response.assets[index]);
          // console.log(response.assets[index].asset_contract.address);
        })
        .catch((err) => console.error(err));
      return check;
    };
  };

  //outside init

  verifyNFT = async () => {
    const tokenID = [];
    const options = { method: "GET" };
    // const accounts = await ethereum.request({ method: "eth_accounts" });
    const accounts = "0xae310299a52b9b3cd40597a3eb7f387d97b7c31f";
    let index;
    let check = false;

    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${accounts}&limit=50`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.assets.forEach((asset) => tokenID.push(asset.token_id));
        index = tokenID.findIndex((id) => id === "0");
        // contractAdrs = tokenID.findIndex(
        //   (adr) => adr === '0x2953399124f0cbb46d2cbacd8a89cf0599974963'
        // );
        if (index === -1) throw new Error("Token is invalid 💥");
        else {
          check = true;
        }
        // console.log(response.assets[index]);
        // console.log(response.assets[index].asset_contract.address);
      })
      .catch((err) => console.error(err));
    return check;
  };
}

export const tokenCheck = new TokenCheck();
export const checkNFT = tokenCheck.verifyNFT();
