fetch("http://localhost:3000/api/products") //requête API
.then(res => {
    return res.json();
})
.then(dataList => {
    console.log(dataList);
    dataList.forEach(data => {
        document.getElementById("items").innerHTML += `<a href="./product.html?id=${data._id}"><article> <img src="${data.imageUrl}" alt="${data.altTxt}">
                                                        <h3 class="productName">${data.name}</h3>
                                                        <p class="productDescription">${data.description}</p></article></a>`;
        
    })
});




/*class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

fetch("http://localhost:3000/api/products") //requête API
.then(data => data.json()) 
.then(dataList => {
    console.log(dataList);
    for(jsonProduct of dataList) { // récupération éléments pour Page d'accueil
        let product = new Product(jsonProduct);
        document.querySelector("section#items.items").innerHTML += `<a href="./product.html?id=${product._id}"><article> <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p></article></a>`;
    }
    });
*/
