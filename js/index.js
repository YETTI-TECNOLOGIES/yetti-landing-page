/*

===================================== SELECTORS ===============================================

*/
const header = document.querySelector('header');
const heroSection = document.querySelector("#hero");
const allSections = document.querySelectorAll('section');

/*

===================================== FUNCTIONS ===============================================

*/


function showHeader(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add('active');
      scrollToTopBtn.classList.add('active');
    } else {
      header.classList.remove('active');
      scrollToTopBtn.classList.remove('active');
    }
  })
}

// GSAP animations for each sections of the page
function animateSection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let activeSection = entry.target.id;
      
      if (activeSection === "hero") {
        gsap.from("#hero .slide--to-right", {
          x: -100,
          y: -50,
          duration: 0.4,
          ease: "power1.out"
        });
        gsap.fromTo("#hero .bounce--up-down", {y: -15}, {y: 15, duration: 2, repeat: -1, yoyo:true});

        observer.unobserve(entry.target);

      } else if (activeSection === "operation") {
        gsap.fromTo(".operation-inner", {y: "50%"}, {y: 0, ease: "power1.out", duration: 1});

        observer.unobserve(entry.target);

      } else if (activeSection === "activity") {
        gsap.from(".slide--to-left", {x: "200%", duration: 1, ease: "power1.out"});
        gsap.from("#activity .slide--to-right", {x: "-200%", duration: 1, ease: "power1.out"});

        observer.unobserve(entry.target);

      } else if (activeSection === "pricing") {
        gsap.fromTo(".pricing-inner", {y: "50%"}, {y: 0, ease: "power1.out", duration: 1});
        observer.unobserve(entry.target);
      }
    }
  })
}

/*

===================================== Intersection Observers ====================================

*/


const heroObserver = new IntersectionObserver(showHeader, {
  root: null,
  threshold: 0.05,
});
heroObserver.observe(heroSection);


const sectionObserver = new IntersectionObserver(animateSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => sectionObserver.observe(section));
