"use strict";

/*


===================================== SELECTORS ===============================================

*/

const regFormContainer = document.querySelector(".signup_container");
const regForm = document.querySelector(".signup_form");

const stepContainer = document.querySelector(".get-started");
const gsSlider = document.querySelector(".gs_slider");
const gsSlide = document.querySelectorAll(".gs_slide");
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
let slidesLength = gsSlide.length;
let size = 100 / slidesLength;

function nextSlide() {
  if (counter === slidesLength) return;
  counter++;
  gsSlider.style.transform = `translateX(-${counter * size}%)`;
  stepContainer.scrollIntoView();
}

function prevSlide() {
  if (counter === 0) return;
  counter--;
  gsSlider.style.transform = `translateX(-${counter * size}%)`;
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
    let country = value.name.common;
    countries.push(country);
  }
  countries.sort();
  countries.forEach((country) => {
    let countryHtml = `<option value="${country}" class="country">${country}</option>`;
    countryList.insertAdjacentHTML("beforeend", countryHtml);
  });
});
