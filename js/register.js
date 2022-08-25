"use strict";

/*


===================================== SELECTORS ===============================================

*/

const regFormContainer = document.querySelector(".signup_container");
const regForm = document.querySelector(".signup_form");

const stepContainer = document.querySelector(".get-started");

/*


===================================== FUNCTIONS ===============================================

*/
function hideRegForm() {
  regFormContainer.classList.add("d-none");
  stepContainer.classList.remove("d-none");
  window.scrollTo(0, 0);
}

/*


===================================== EVENT HANDLER ===============================================

*/
regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideRegForm();
});
