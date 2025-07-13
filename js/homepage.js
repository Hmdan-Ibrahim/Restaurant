
import { AddClassToShow, sharedCode, displayProducts } from "./utilities/functions.js"
import { clsData } from "./utilities/classes.js"
import { Discount } from "./utilities/commonVariables.js"

let setIntervalTimer = 6000

let welcomeSection = document.querySelector(".welcome")
let landingImgs = ["image.jpg", "booking.png", "OIP.jfif"]
let landingCounter = 0

sharedCode()

function changeLandingImage(arrImgs, counter) {

    if (counter == arrImgs.length) counter = 0
    else if (counter < 0) counter = arrImgs.length - 1

    welcomeSection.style.backgroundImage = ` url(/imgs/${arrImgs[counter]})`
    landingCounter = counter
}

setInterval(_ => {
    landingCounter++
    changeLandingImage(landingImgs, landingCounter)
}, setIntervalTimer)

document.querySelector(".welcome .fa-angle-left").onclick = function () {
    landingCounter--;
    changeLandingImage(landingImgs, landingCounter)
}

document.querySelector(".welcome .fa-angle-right").onclick = function () {
    landingCounter++;
    changeLandingImage(landingImgs, landingCounter)
}


// OFFER
let offerSection = document.getElementById("offer")
let numberDiscount = offerSection.querySelector(".num-discount")
let codeDiscount = offerSection.querySelector(".code-discount")

if (Discount > 0) {
    AddClassToShow(offerSection, "show")
    numberDiscount.textContent = `${Discount}%`
    codeDiscount.textContent = `"LOVER${Discount}"`
}


// Our Services
let servicesSection = document.getElementById("our-services")
let Menu = servicesSection.querySelector(".menu ul")
let showServices = servicesSection.querySelector(".services")
let isProductDisplayed = false


onscroll = function () {

    if (scrollY >= servicesSection.offsetTop - 500) {
        if (!isProductDisplayed) {
            let servicesData = new clsData("/database/products.json")

            servicesData.loadData().then(response => {
                displayProducts("startars", servicesData, showServices)
                servicesData.getCategories().forEach(categoryName => Menu.innerHTML += `<li>${categoryName}</li>`)

                const categoryMenu = servicesSection.querySelectorAll(".menu ul li")
                categoryMenu.forEach((ele) => {
                    ele.onclick = function () {
                        categoryMenu.forEach(ele => ele.classList.remove("active"))
                        this.className = "active";
                        displayProducts(this.innerHTML, servicesData, showServices)
                    }
                })
            })
            isProductDisplayed = true
        }
    }
}


// Testimonials
const testimonialsSection = document.querySelector(".testimonials")
const clientContent = testimonialsSection.querySelector(".client")
let isTestimonialsShow = false
let counterTestimonial = 0

addEventListener("scroll", function () {
    if (scrollY >= testimonialsSection.offsetTop - 500) {
        if (!isTestimonialsShow) {
            fetch("/Database/testimonials.txt").then(response => response.json()).then(testimonials => {
                displayTestimonial(testimonials[0])

                setInterval(_ => {
                    counterTestimonial++;
                    if (counterTestimonial == testimonials.length) counterTestimonial = 0
                    displayTestimonial(testimonials[counterTestimonial])
                }, setIntervalTimer)

                testimonialsSection.querySelector("i.fa-angle-left").onclick = () => {
                    counterTestimonial--;
                    if (counterTestimonial < 0) counterTestimonial = testimonials.length - 1
                    displayTestimonial(testimonials[counterTestimonial])
                }

                testimonialsSection.querySelector("i.fa-angle-right").onclick = () => {
                    counterTestimonial++;
                    if (counterTestimonial == testimonials.length) counterTestimonial = 0
                    displayTestimonial(testimonials[counterTestimonial])
                }

            })
            isTestimonialsShow = true
        }
    }
})

function displayTestimonial(testimonial) {
    clientContent.innerHTML = `
        <img src="${testimonial.image}" alt="user image">
        <div class="text-content">
            <h3>${testimonial.username}</h3>
            <p>${testimonial.testimonial} </p>
        </div>
    `
}
