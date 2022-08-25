"use strict";

/*


===================================== SELECTORS ===============================================

*/

const regFormContainer = document.querySelector(".signup_container");
const regForm = document.querySelector(".signup_form");

const stepContainer = document.querySelector(".get-started");
const gsSLider = document.querySelector(".gs_slider");
const gsPrev = document.querySelectorAll(".gs_slide--left");
const gsNext = document.querySelectorAll(".gs_next");
const gsSkip = document.querySelectorAll(".skip");
const gsInit = document.querySelector(".gs_init");

const countryList = document.querySelector("#business-location");

/*


===================================== FUNCTIONS ===============================================

*/
function hideRegForm() {
  regFormContainer.classList.add("d-none");
  stepContainer.classList.remove("d-none");
  window.scrollTo(0, 0);
}

let counter = 0;
let slidesLength = 4;

function nextSlide() {
  if (counter === slidesLength) return;
  counter++;
  gsSLider.style.transform = `translateX(-${counter * 20}%)`;
  stepContainer.scrollIntoView();
}

function prevSlide() {
  if (counter === 0) return;
  counter--;
  gsSLider.style.transform = `translateX(-${counter * 20}%)`;
}

/*


===================================== EVENT HANDLER ===============================================

*/
regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideRegForm();
});

gsInit.addEventListener("click", function () {
  nextSlide();
});

gsNext.forEach((btn) => {
  btn.addEventListener("click", function () {
    nextSlide();
  });
});

gsSkip.forEach((btn) => {
  btn.addEventListener("click", function () {
    nextSlide();
  });
});

gsPrev.forEach((btn) => {
  btn.addEventListener("click", function () {
    prevSlide();
  });
});

/*


===================================== API CALLS ===============================================

*/
let countries = [];
axios.get("https://restcountries.com/v3.1/all").then(function (response) {
  const countryInfo = response.data;
  for (const value of countryInfo.values()) {
    let country = {
      name: value.name.common,
      flag: value.flags.png,
    };
    countries.push(country);
  }
  console.log(countries);
});
