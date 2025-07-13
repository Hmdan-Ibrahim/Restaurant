import { clsData } from "./utilities/classes.js"
import { sharedCode, displayProducts } from "./utilities/functions.js"

sharedCode()

const productsPage = document.getElementById("Products-page")
const head = productsPage.querySelector(".container > h2")
const selectCategory = productsPage.querySelector("#select-category")
let showServices = productsPage.querySelector(".services")


const productsFromDB = new clsData("./Database/products.json")

selectCategory.onchange = function() {
    head.innerHTML = this.value
    displayProducts(selectCategory.value, productsFromDB, showServices)
}

productsFromDB.loadData().then(_ => {

    productsFromDB.getCategories().forEach(categoryName => selectCategory.innerHTML += `<option value="${categoryName}">${categoryName}</li>`)

    displayProducts("All Products", productsFromDB, showServices)
})
