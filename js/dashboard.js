let dashboardMenu = document.querySelectorAll("#dashboard .dashboard-menu ul li")
let showChooise = document.querySelectorAll("#dashboard .show-chooise > div")

dashboardMenu.forEach((ele) => {
    ele.onclick = function () {
        dashboardMenu.forEach(ele => ele.classList.remove("active"))
        this.className = "active"

        showChooise.forEach(elementChoice =>
            elementChoice.style.display = elementChoice.className === this.textContent ? "block" : "none")
    }
})

let categoryBTN = document.querySelector(".categBTN")
let productBTN = document.querySelector(".prodBTN")

let formCategory = document.getElementById("category-form")
let formProduct = document.getElementById("product-form")

let addCateg = document.getElementById("addCateg")
let categoryInput = document.querySelector("#category-form input")


let productsDisplaySection = document.querySelector(".display-products")
let overlay = document.querySelector(".overlay")
let popupDel = document.querySelector(".popup-delete")

import { AddClassToShow, goUpBTN, clsData } from "./functions.js"
goUpBTN()

// let dataFromJson = new clsData("../Database/products.txt" , await(await fetch("../Database/products.txt")).json())
let dataFromJson = new clsData("../Database/products.txt")


categoryBTN.onclick = _ => {
    AddClassToShow(formCategory, "show");
}

productBTN.onclick = _ => {
    AddClassToShow(formProduct, "show")

}


addCateg.onclick = function (event) {
    event.preventDefault()
    if (categoryInput.value != '') {
        let categoryValue = categoryInput.value.toLowerCase()
        if (this.value.toLowerCase() == "add") {
            dataFromJson.addCategory(categoryValue)
        } 
        else {
            dataFromJson.updateCategory(categoryInput.dataset.old, categoryValue)
        }
        categoryInput.removeAttribute(`data-old`)
        categoryBTN.innerHTML = "Add Category"
        this.value = "Add"
        categoryInput.value = ''
        displayItems()
    }

}


let selectCategory = document.getElementById("choose-category")
let imgPreview = formProduct.querySelector('label#labelImg img')
let ProductImg = document.getElementById('getImage')
let ProdName = formProduct.querySelector("input[name='name']")
let ProdPrice = formProduct.querySelector("input[name='price']")
let ProdDescription = formProduct.querySelector("textarea[name='description']")
let addProdBTN = document.getElementById("addProdBTN")

let defaultImg = imgPreview.src

ProductImg.onchange = event => imgPreview.src = URL.createObjectURL(event.target.files[0])


addProdBTN.onclick = function (event) {
    event.preventDefault()
    let isInputsCompleted = ProdName.value != '' && ProdPrice.value != '' && ProdDescription.value != ''
    let isImgSelected = imgPreview.src != defaultImg

    if (isInputsCompleted && isImgSelected) {
        const NewProduct = {
            'name': ProdName.value.toLowerCase(),
            "image": imgPreview.src,
            "price": Number(ProdPrice.value),
            "description": ProdDescription.value || ""
        }

        if (this.value.toLowerCase() == "add") {
            dataFromJson.addProduct(selectCategory.value, NewProduct)

        } else {
            let oldCateg = selectCategory.dataset.oldCateg
            let oldProd = ProdName.dataset.oldProd

            dataFromJson.updateProduct(oldCateg, selectCategory.value, oldProd, NewProduct)
        }

        imgPreview.src = defaultImg
        selectCategory.removeAttribute(`data-oldCateg`)
        ProdName.removeAttribute(`data-oldProd`)
        categoryBTN.innerHTML = "Add Product"
        this.value = 'Add'
        ProdName.value = ProdPrice.value = ProdDescription.value = ""
        displayItems()
    }
}


await dataFromJson.loadData().then(_ => {
    displayItems()
})
.catch(error =>
    productsDisplaySection.innerHTML = "Something is happen"
)


function displayItems() {
    productsDisplaySection.innerHTML = ''
    selectCategory.innerHTML = ''

    let categories = dataFromJson.getCategories()

    categories.forEach(category => {
        selectCategory.innerHTML += `
            <option value="${category}">${category}</option>
        `

        let table = document.createElement("table")
        let caption = document.createElement("caption")
        caption.id = category
        caption.className = 'category'

        caption.innerHTML = `
            <h3>${category}</h3>
            <button class="updateBTN">update</button>
            <button class="deleteBTN">delete</button>
        `

        table.appendChild(caption)
        let thead = document.createElement("thead")
        thead.innerHTML = `
            <thead>
                <tr>
                    <th>image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
        `

        table.appendChild(thead)
        let products = dataFromJson.getProducts(category)
        let tbody = document.createElement('tbody')
        tbody.setAttribute("class", `products`)
        tbody.setAttribute("data-category", `${category}`)

        if (products.length > 0) {
            products.forEach(product => {
                tbody.innerHTML += `
                    <tr class="product" id="${product.name}">
                        <td><img src="${product.image}" alt=""></td>
                        <td>${product.name}</td>
                        <td>${product.price}$</td>
                        <td><button class="updateBTN">update</button></td>
                        <td><button class="deleteBTN">delete</button></td>
                    </tr>
                `
            })
        } else {
            thead.innerHTML = `<tr><th>There are no Products in this category</tr>`
        }

        table.appendChild(tbody)
        productsDisplaySection.appendChild(table)
    })
}


document.addEventListener("click", function (ele) {
    if (ele.target.innerHTML == "delete") {
        overlay.style.display = "block";
        popupDel.style.display = "block";
        popupDel.style.top = `calc(190px + ${scrollY}px)`

        document.getElementById("D-yes").onclick = function () {
            ele.target.parentElement.classList.contains("category") ?
                dataFromJson.deleteCategory(ele.target.parentElement.id)
                : dataFromJson.deleteProduct(ele.target.closest('tbody').dataset.category, ele.target.closest('tr').id)

            popupDel.style.display = "none";
            displayItems()
            overlay.style.display = "none";
        }

        document.getElementById("D-no").onclick = _ => {
            popupDel.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    else if (ele.target.innerHTML == "update") {
        if (ele.target.parentElement.classList.contains("category")) {
            formCategory.classList.add('show')
            categoryInput.focus()
            categoryBTN.innerHTML = "Update Category"
            categoryInput.value = ele.target.parentElement.id
            categoryInput.dataset.old = categoryInput.value
            addCateg.value = "update"
        } else {
            let products = dataFromJson.getProducts(ele.target.closest('tbody').dataset.category)
            let product = products.filter(prod => prod.name == ele.target.closest('tr').id)[0]

            formProduct.classList.add('show')
            categoryInput.focus()
            productBTN.textContent = 'Update Product'
            selectCategory.value = ele.target.closest('tbody').dataset.category
            selectCategory.dataset.oldCateg = selectCategory.value
            imgPreview.src = product.image
            ProdName.value = ProdName.dataset.oldProd = product.name
            ProdPrice.value = product.price
            ProdDescription.value = product.description
            addProdBTN.value = "update"
        }
    }
}
)
