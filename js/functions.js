export const Discount = 10

export class clsData {
    constructor(URL) {
        this.url = URL
        this.data;
    }

    loadData() {
        return new Promise((Resolve, Reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", this.url)
            request.responseType = "json"
            request.send()


            request.onload = () => {
                if (request.readyState == 4 & request.status === 200) {
                    this.data = request.response;
                    console.log(request.response)
                    Resolve(this.data)
                } else {
                    Reject(new Error("Error loading Data" + this.statusText))
                }
            }

            request.onerror = () => {
                Reject(new Error('Request failed'));
            };
        })
    }

    getCategories() {
        // let cat = Object.values(this.data).map(ele => ele.name)
        return Object.keys(this.data).sort()
    }

    getProducts(categName) {
        console.log(this.data);
        
        return Object.values(this.data[categName]).filter((ele) => ele.name).sort((a, b) => a.name.localeCompare(b.name))
    }

    getProduct(categName, prodName) {
        return this.data[categName][prodName]
    }

    addCategory(categoryName) {
        categoryName in this.data ?
            console.log("This category is Found")
            : this.data[categoryName] = { 'name': categoryName }
    }

    addProduct(categoryName, productAdded) {
        // console.log(productAdded.name)


        productAdded.name in this.data[categoryName] ?
            console.log("This product is Found")
            : this.data[categoryName][productAdded.name] = productAdded
        console.log(productAdded.name)
        console.log(this.data)

    }

    updateCategory(oldCategName, newCategName) {
        if (oldCategName == newCategName) console.log("The old value & new value is the same")

        else {
            this.data[newCategName] = this.data[oldCategName];
            this.data[newCategName].name = newCategName
            delete this.data[oldCategName];
        }
    }

    updateProduct(oldCateg, newCateg, oldProduct, newProduct) {
        delete this.data[oldCateg][oldProduct]
        this.data[newCateg][newProduct.name] = newProduct
        // console.log(this.data)
    }


    deleteCategory(categoryName) {
        delete this.data[categoryName]
    }

    deleteProduct(categoryName, productName) {
        delete this.data[categoryName][productName]
    }
}


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

export function sharedCode() {
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


export function getDiscount(mainPrice , discount){
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
            if (!displayAllProducts) ProductsContent.innerHTML = `<p class="secondary-text">This category <span class="primary-text">"${category}" </span> is Empty </p>`
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

export { AddClassToShow, goUpBTN, displayProducts }

/*

class clsMenegement {
    #URL
    constructor(url) {
        this.#URL = url
    }

    async readCategories() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest()
            request.responseType = "json"
            request.open("GET", this.#URL)
            request.send()

            request.onload = function () {
                if (this.readyState == 4 && this.status) {
                    Data = this.response
                    resolve(Data)
                }
                else {
                    reject("Not Found Products")
                }
            }
        }
        )
    }

    getProducts(categoryName) {
        console.log(Data)
    }
}


*/






// let Data = {
//     "startars": {
//         "sweet": {
//             "name": "Sweet",
//             "price": 10,
//             "description": "Sweet before food"
//         },
//         "FoodS": {
//             "name": "FoodS",
//             "price": 15,
//             "description": "Food before Main Food"
//         }
//     }
//     ,
//     "food": {
//         "goatMeet": {
//             "name": "Goat meet",
//             "price": 50,
//             "description": "Goat meet is One of the main food"
//         },
//         "CawMeet": {
//             "name": "caw meet",
//             "price": 50,
//             "description": "caw meet is One of the main food"
//         },
//         "pasta_italic": {
//             "name": "Pasta Italic",
//             "price": 20,
//             "description": "Pasta Italic is One of the main food"
//         }
//     }
//     ,
//     "drinking": {
//         "joice": {
//             "name": "Joice Drink",
//             "price": 5,
//             "description": "Joice Fresh Drink"
//         },
//         "orangeJoice": {
//             "name": "Orange Joice Drink",
//             "price": 5,
//             "description": "Orange Joice Fresh Drink"
//         },
//         "coffee": {
//             "name": "Coffee Drink",
//             "price": 5,
//             "description": "Coffee Drink"
//         }
//     }
// }

// class clsProduct {
//     constructor(name,price,desc) {
//         this.name = name
//         this.price = price
//         this.description = desc
//     }

//     getProduct
// }