class clsProduct {
    constructor(category , name , price , image , descripsion){
        this.category = category;
        this.name = name;
        this.price = price;
        this.image = image;
        this.desc = descripsion;
    }
}

class clsCategory {
    constructor(name) {
        this.name = name
    }
}

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
        return Object.values(this.data[categName]).filter((ele) => ele.name).sort((a, b) => a.name.localeCompare(b.name))
    }

    getProduct(categName, prodName) {
        return this.data[categName][prodName]
    }

    addCategory(categoryName) {
        categoryName in this.data ?
            alert("This category is Found")
            : this.data[categoryName] = { 'name': categoryName }
    }

    addProduct(categoryName, productAdded) {
        productAdded.name in this.data[categoryName] ?
            alert("This product is Found")
            : this.data[categoryName][productAdded.name] = productAdded
    }

    updateCategory(oldCategName, newCategName) {
        if (oldCategName == newCategName) alert("The old value & new value is the same")

        else {
            this.data[newCategName] = this.data[oldCategName];
            this.data[newCategName].name = newCategName
            delete this.data[oldCategName];
        }
    }

    updateProduct(oldCateg, newCateg, oldProduct, newProduct) {
        delete this.data[oldCateg][oldProduct]
        this.data[newCateg][newProduct.name] = newProduct
    }

    deleteCategory(categoryName) {
        delete this.data[categoryName]
    }

    deleteProduct(categoryName, productName) {
        delete this.data[categoryName][productName]
    }
}