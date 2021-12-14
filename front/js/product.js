// Récupération ID produit
let str = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
if(search_params.has('id')) {
    let productId = search_params.get('id');
    console.log(productId);
}

// Récupération 
let productId = window.location.search.replace("?id=", "");

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(data => data.json())
    .then(jsonProductDetail => {
        console.log(jsonProductDetail);
        document.querySelector("h1").innerHTML = jsonProductDetail["name"];
        document.querySelector("#price").innerHTML = jsonProductDetail["price"];
        document.querySelector("#description").innerHTML = jsonProductDetail["description"];
        
   
});

/*fetch(`http://localhost:3000/api/products/${productId}`)
.then(data => data.json()) 
.then(jsonProductDetail => {
    console.log(jsonProductDetail);
});*/