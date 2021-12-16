// ------------------- Récupération ID produit
let productId;
let str = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
if(search_params.has('id')) {
    productId = search_params.get('id');
    //console.log(productId);
}

// ------------------- Récupération données du produit (format Json)
let colorOption;
fetch(`http://localhost:3000/api/products/${productId}`) 
    .then(data => data.json())
    .then(jsonProductDetail => {
        //console.log(jsonProductDetail);
        document.querySelector("h1").innerHTML = jsonProductDetail["name"];
        document.querySelector("#price").innerHTML = jsonProductDetail["price"];
        document.querySelector("#description").innerHTML = jsonProductDetail["description"];
        document.querySelector("div.item__img").innerHTML = `<img src="${jsonProductDetail["imageUrl"]}" alt="${jsonProductDetail["altTxt"]}">`;
        jsonProductDetail.colors.forEach(element => {
            colorOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorOption);
            colorOption.innerHTML = `<option value="${element}">${element}</option>`; 
        });
    });

// ------------------- Gestion du panier

// Variables utilisées
let cart = [];
const addedColor = document.querySelector("#colors");
const addedQuantity = document.getElementById("quantity");


// Ajout d'un produit au panier
const addButton = document.getElementById("addToCart");
addButton.addEventListener('click', function(event) { //on écoute le bouton
    event.preventDefault;
    let addedProduct = { //on stocke la commande dans un objet
        ID:productId,
        Couleur: addedColor.value,
        Quantite: addedQuantity.value
    };
    //console.log(addedProduct); // afficher le produit commandé
    
    
    

    // ------------------- Local Storage
    //optionsProduits pour Egenie == addedProduct pour moi

    // création variable pour stocker les données dans le local storage
    let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("product"));

    if(produitEnregistreDansLocalStorage) { //s'il y a déjà des produits d'enregistrés dans le lS
        produitEnregistreDansLocalStorage.push(addedProduct);
        localStorage.setItem("product", JSON.stringify(produitEnregistreDansLocalStorage));
        console.log(produitEnregistreDansLocalStorage);

    } else { // s'il n'y a pas de produits enregistrés dans le LS
        produitEnregistreDansLocalStorage = [];
        produitEnregistreDansLocalStorage.push(addedProduct);
        localStorage.setItem("product", JSON.stringify(produitEnregistreDansLocalStorage));

        console.log(produitEnregistreDansLocalStorage);
    };

});