/*

===================================== SELECTORS ===============================================

*/
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavbarInner = document.querySelector(".mobile-navbar-inner");
const navBtn = document.querySelector(".burger");
const navLinks = document.querySelectorAll("nav ul li");
const scrollToTopBtn = document.querySelector("#scroll-to-top");

/*

===================================== FUNCTIONS ===============================================

*/

// animate hover state on navbar links (desktop)
function showPointer(links) {
    links.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        link.classList.add("w-100");
      });
      link.addEventListener("mouseleave", function () {
        link.classList.remove("w-100");
      });
    });
  }
  showPointer(navLinks);

// open and close navbar
function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  navBtn.classList.toggle("active");
}

/*


===================================== EVENT HANDLER ===============================================

*/
navBtn.addEventListener("click", openAndCloseNavbar);
mobileNavbarInner.addEventListener('click', function(e) {
  if (e.target.closest('ul').classList.contains('mobile-navlinks'))
  openAndCloseNavbar()
})


// scroll to top
scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo(0,0);
})