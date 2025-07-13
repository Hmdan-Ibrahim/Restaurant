import { Discount } from "./commonVariables.js"

function AddClassToShow(itemToShow, displayClass) {
    itemToShow.classList.toggle(displayClass)
}

function goUpBTN() {
    window.onscroll = () => {
        document.querySelector(".go-up").style.bottom = scrollY >= 600 ? "40px" : "-80px"

    }

    document.querySelector(".go-up").onclick = () => {
        scrollTo({
            top: 0
        })
    }
}

function sharedCode() {
    function isAdmin() {
        let Admin = true

        return Admin;
    }

    document.querySelector("[aria-label='Dashboard']").style.display = isAdmin() ? "block" : "none";

    document.getElementById("toggle-menu").onmouseup = function () {
        this.className = this.classList.contains("fa-bars") ? "fas fa-x" : "fas fa-bars";
        AddClassToShow(document.querySelector("nav ul"), "menu-height-bars")
    }

    document.getElementById("search-icon").onclick = _ => AddClassToShow(document.querySelector(".search"), "display-search")

    goUpBTN()
}


function getDiscount(mainPrice , discount){
    return (mainPrice - (discount / 100) * mainPrice)
}

function displayProducts(category, productsFromDB, ProductsContent) {

    function createProducts(category, products, displayAllProducts = false) {
        if (products.length > 0) {
            products.forEach(product => {
                ProductsContent.innerHTML += `
            <a href="./product.html?category=${category}&name=${product.name}" class="product" name="${product.name} Product">
                <img src="${product.image}" alt="${product.name} Picture">
                <h3>${product.name}</h3>
                <div>
                    <h4>salary: ${Discount > 0 ? `<mark>$${getDiscount(product.price, Discount)}</mark> <del>$${product.price}</del>` : `<mark>$${product.price}</mark>`}</h4>
                    <p class="primary-text">Click to show details</p>
                </div>
            </a>
        `
            })
        } else {
            if (!displayAllProducts) {
                ProductsContent.style.display= "block"
                ProductsContent.innerHTML = `<p class="secondary-text">This category <span class="primary-text">"${category}" </span> is Empty </p>`
        }
        }
    }

    ProductsContent.innerHTML = ''

    if (category == "All Products") {
        const categories = productsFromDB.getCategories()
        categories.forEach(category => {
            createProducts(category, productsFromDB.getProducts(category), true)
        })

    } else createProducts(category, productsFromDB.getProducts(category))
}

export { AddClassToShow, goUpBTN, displayProducts, sharedCode, getDiscount }
