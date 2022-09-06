"use strict";

gsap.fromTo(".waiting-img", { y: -15 }, { y: 15, duration: 2, repeat: -1, yoyo: true });

const wlForm = document.querySelector(".waiting-list_form");
const wlInp = wlForm.querySelector(`input[type="email"]`);
const wlBtn = document.querySelector("#submit-n");
const wlMsg = document.querySelector(".wl--msg");
const wlPop = document.querySelector(".wl-popup");
const closePopupBtn = wlPop.querySelector("button");
const wlOverlay = document.querySelector(".wl-overlay");

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function openPopup() {
  wlMsg.classList.remove("warning");
  wlMsg.classList.add("success");
  wlMsg.textContent = "Thanks for subscribing!";
  wlInp.value = "";
  wlPop.querySelector(".msg-one").textContent = `Subscription sucessful!`;
  wlPop.querySelector(".msg-two").textContent = `Thanks for subsribing to our mailing list.`;
  wlPop.classList.add("active");
  wlOverlay.classList.add("active");
}

function closePopup() {
  wlMsg.classList.remove("success");
  wlPop.classList.remove("active");
  wlOverlay.classList.remove("active");
}

function sendEmail(data) {
  axios
    .post("https://yetti-backend.herokuapp.com/api/v1/waitlist/", data)
    .then((response) => {
      if (response.status == 201 || response.status == 200) {
        console.log(response);
        openPopup();
        setTimeout(closePopup, 10000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

closePopupBtn.addEventListener("click", closePopup);
wlOverlay.addEventListener("click", closePopup);

let email;
let matches;

wlInp.addEventListener("input", function () {
  email = wlInp.value.toLowerCase().trim();
  matches = emailRegex.test(email);
  if (email) {
    if (!matches) {
      wlMsg.textContent = "Enter a valid email address!";
      wlMsg.classList.add("warning");
    } else {
      wlMsg.classList.remove("warning");
    }
  } else {
    wlMsg.classList.remove("warning");
  }
});

wlForm.addEventListener("submit", function (e) {
  e.preventDefault();
  email = wlInp.value.toLowerCase().trim();
  matches = emailRegex.test(email);

  if (matches) {
    const data = {
      email: `${email}`,
    };
    sendEmail(data);
  } else {
    return;
  }
});
