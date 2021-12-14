class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

fetch("http://localhost:3000/api/products") //requête API
.then(data => data.json()) 
.then(jsonListProducts => {
    console.log(jsonListProducts);
    for(jsonProduct of jsonListProducts) { // récupération éléments pour Page d'accueil
        let product = new Product(jsonProduct);
        document.querySelector("section#items.items").innerHTML += `<a href="./product.html?id=${product._id}"><article> <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p></article></a>`;
    }
    });

