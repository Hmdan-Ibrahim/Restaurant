import { sharedCode, getDiscount } from "./utilities/functions.js"
import {clsData} from './utilities/classes.js'
import { Discount } from "./utilities/commonVariables.js"

const productPage = document.getElementById("Product-page")
const productDetails = productPage.querySelector(".details")

// Shared code in all Pages
sharedCode()

let servicesData = new clsData("/Database/products.json")

const getQueryParams = _ => {
    const params = new URLSearchParams(window.location.search)

    return {
        category: params.get("category"),
        name: params.get("name")
    }
}

const { category: categoryName, name: productName } = getQueryParams()


document.head.querySelector("title").innerHTML = getQueryParams()["name"] + " Product"

servicesData.loadData().then( _ => {
    const product = servicesData.getProduct(categoryName, productName);
    displayProductDetails(product)
})

function displayProductDetails(product){
    const imgDiv = document.createElement("div")
    imgDiv.setAttribute("class" , "image")
    productDetails.appendChild(imgDiv)

    const image = document.createElement("img")
    image.setAttribute("src",  `${product.image}`)
    image.setAttribute("alt",  `${product.name} Image`)
    imgDiv.appendChild(image)


    const textContent = document.createElement("div")
    textContent.setAttribute("class" , "text")
    productDetails.appendChild(textContent)

    const prod_name = document.createElement("h2")
    const textPName = document.createTextNode(`${product.name}`)
    prod_name.appendChild(textPName)
    textContent.appendChild(prod_name)

    const descriptionHead = document.createElement("h3")
    const descriptionHeadContent = document.createTextNode("Description: ")
    descriptionHead.appendChild(descriptionHeadContent)
    textContent.appendChild(descriptionHead)

    const descriptionElement = document.createElement("p")
    descriptionElement.setAttribute("class" , "secondary-text")
    const descriptionText = document.createTextNode(`${product.description}`)
    descriptionElement.appendChild(descriptionText)
    textContent.appendChild(descriptionElement)

    const salaryH4 = document.createElement("h4")
    salaryH4.innerHTML = `salary: ${Discount > 0 ? `<mark>$${getDiscount(product.price , Discount)}</mark> <del>$${product.price}</del>` : `<mark>$${product.price}</mark>`}`
    textContent.appendChild(salaryH4)

    const addBTN = document.createElement("button")
    addBTN.setAttribute("class", "btn btn-secondary")
    const btnText = document.createTextNode("Add to card")
    addBTN.appendChild(btnText)
    textContent.appendChild(addBTN)
}
