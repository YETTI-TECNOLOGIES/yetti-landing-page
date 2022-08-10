'use strict';

const newsletter = document.querySelector(".newsletter");
const newsletterInp = newsletter.querySelector(`input[type="email"]`)
const newsletterBtn = document.querySelector("#submit-n");
const newsletterMsg = document.querySelector('.newsletter--msg');
const newsletterPop = document.querySelector(".newsletter-popup");
const closePopupBtn = newsletterPop.querySelector("button");
const overlay = document.querySelector(".overlay");

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function openPopup(response) {
    newsletterMsg.classList.remove('warning');
    newsletterMsg.classList.add('success');
    newsletterMsg.textContent = 'Thanks for subscribing!';
    newsletterInp.value = '';
    newsletterPop.querySelector(".msg-one").textContent = `${response.data.data}`;
    newsletterPop.querySelector(".msg-two").textContent = `${response.data.message}`;
    newsletterPop.classList.add("active");
    overlay.classList.add("active");
}

function closePopup() {
    newsletterMsg.classList.remove("success");
    newsletterPop.classList.remove("active");
    overlay.classList.remove("active")
}

function sendEmail(data) {
    axios.post("https://yetti-backend.herokuapp.com/api/v1/newsletter/", data).then(response => {
        if (response.status == 201) {
            openPopup(response);
            setTimeout(closePopup, 10000);
        }
    }).catch(error => {
        console.log(error);
    })
}

closePopupBtn.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

let email;
let matches;

newsletterInp.addEventListener('input', function() {
    email = newsletterInp.value.toLowerCase().trim();
    matches = emailRegex.test(email);
    if (email) {
        if (!matches) {
            newsletterMsg.textContent = 'Enter a valid email address!'
            newsletterMsg.classList.add('warning')
        } else {
            newsletterMsg.classList.remove('warning');
        }
    } else {
        newsletterMsg.classList.remove('warning');
    }
})

newsletter.addEventListener('submit', function(e) {
    e.preventDefault()
    email = newsletterInp.value.toLowerCase().trim();
    matches = emailRegex.test(email);

    if (matches) {
        const data = {
            email: `${email}`   
        }
        sendEmail(data);
    } else {
        return
    }
})